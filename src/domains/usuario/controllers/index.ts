import {Router, Request, Response, NextFunction} from "express";
import { readUsuarios } from "../services/UserServices"

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const novoUsuario = await readUsuarios();
        return res.json(novoUsuario);
    }catch(error){
        next(error);
    }
}
);

export default router;