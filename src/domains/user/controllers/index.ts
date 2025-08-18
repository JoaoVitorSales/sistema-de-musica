import {Router, Request, Response, NextFunction} from "express";
import UserService from "../services/UserServices"
import { login, logout, notLoggedIn, verifyJWT } from "../../middlewares/auth";

const router = Router();

router.post("/login", notLoggedIn, login);

router.post("/logout", verifyJWT, logout);


router.get("/account",verifyJWT, async(req: Request, res: Response, next: NextFunction) => {
    try{
        const usuarioUnico = await UserService.readUserSelect(req.user.id);
        res.json(usuarioUnico);
    }catch(error){
        next(error);
    }
});

router.post("/create", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const usuario = await UserService.createUser(req.body);
        res.json(`usuario com nome ${usuario.nome} criado`);
    }catch(error){
        next(error);
    }
});

router.put("/account/update",verifyJWT, async(req: Request, res: Response, next: NextFunction) => {
    try{
        const usuario = await UserService.updateUser(req.user.id, req.body);
        res.json(`usuario com nome ${usuario.nome} atualizado`);
    }catch(error){
        next(error);
    }
});

router.put("/account/password",verifyJWT, async(req: Request, res: Response, next: NextFunction) => {
    try{
        const usuario = await UserService.updatePassword(req.user.id, req.body);
        res.json(`usuario com nome ${usuario.nome} atualizado`);
    }catch(error){
        next(error);
    }
});

router.delete("/account/delete",verifyJWT, async(req: Request, res: Response, next: NextFunction) => {
    try{
        const usuario = await UserService.deleteUser(req.user.id);
        res.json(`usuario com nome ${usuario.nome} deletado`);
    }catch(error){
        next(error);
    }
});


export default router;