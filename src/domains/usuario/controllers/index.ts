import {Router, Request, Response, NextFunction} from "express";
import { readUsuarios, readUsuariosByID, createUsuario, updateUsuario, deleteUsuario } from "../services/UserServices"

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

router.get("/:id", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const usuarioUnico = await readUsuariosByID(Number(req.params.id));
        res.json(usuarioUnico);
    }catch(error){
        next(error);
    }
});

router.post("/", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const usuario = await createUsuario(req.body);
        res.json(`usuario com nome ${usuario.nome} criado`);
    }catch(error){
        next(error);
    }
});

router.put("/:id", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const usuario = await updateUsuario(Number(req.params.id), req.body);
        res.json(`usuario com nome ${usuario.nome} atualizado`);
    }catch(error){
        next(error);
    }
});

router.delete("/:id", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const usuario = await deleteUsuario(Number(req.params.id));
        res.json(`usuario com nome ${usuario.nome} deletado`);
    }catch(error){
        next(error);
    }
});


export default router;