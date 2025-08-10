import {Router, Request, Response, NextFunction} from "express";
import UserService from "../services/UserServices"

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const novoUsuario = await UserService.readUser();
        return res.json(novoUsuario);
    }catch(error){
        next(error);
    }
}
);

router.get("/:id", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const usuarioUnico = await UserService.readUserById(Number(req.params.id));
        res.json(usuarioUnico);
    }catch(error){
        next(error);
    }
});

router.post("/", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const usuario = await UserService.createUser(req.body);
        res.json(`usuario com nome ${usuario.nome} criado`);
    }catch(error){
        next(error);
    }
});

router.put("/:id", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const usuario = await UserService.updateUser(Number(req.params.id), req.body);
        res.json(`usuario com nome ${usuario.nome} atualizado`);
    }catch(error){
        next(error);
    }
});

router.delete("/:id", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const usuario = await UserService.deleteUser(Number(req.params.id));
        res.json(`usuario com nome ${usuario.nome} deletado`);
    }catch(error){
        next(error);
    }
});


export default router;