import prisma from "../../../config/prismaClient";
import { Request, Response, NextFunction } from "express";
import {compare} from "bcrypt";
import { PermissionError } from "../../../errors/PermissionError";
import statusCodes from "../../../utils/constants/statusCodes";
import { usuario } from "@prisma/client";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { TokenError } from "../../../errors/TokenError";


function generateJWT(usuario: usuario, res:Response){
    const body = {
        id: usuario.id,
        email: usuario.email,
        name: usuario.nome,
        privilegios: usuario.privilegios 
    };

    const token = sign({usuario: body}, process.env.SECRET_KEY || "", {expiresIn: Number(process.env.JWT_EXPIRATION)});

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development"
    })
}

function cookieExtractor(req: Request){
    let token = null;
    if (req.cookies){
        token = req.cookies["jwt"];
    }
    return token;
}

export function verifyJWT(req:Request, res: Response, next: NextFunction){
    try {
        const token = cookieExtractor(req);

        if (token){
            const decoded = verify(token, process.env.SECRET_KEY || "") as JwtPayload;
            req.user = decoded.user;
        }

        if (req.user == null){
            throw new TokenError("Você precisa ta logado para realizar essa ação");
        }

        next();
    } catch (error) {
        next(error)        
    }
}

export async function login(req:Request, res: Response, next: NextFunction) {
    try {
        const usuario = await prisma.usuario.findUnique({
            where:{
                email: req.body.email
            }
        })

        if(!usuario){
            throw new PermissionError("Email e/ou senha incorretos")
        }

        const match = compare(req.body.password, usuario.senha);

        if (!match){
            throw new PermissionError("Email e/ou senha incorretos")
        }

        generateJWT(usuario, res);

        res.status(statusCodes.SUCCESS).json("login realizado com sucesso");
    } catch (error) {
        next(error);
    }
}