import {Router, Request, Response, NextFunction} from "express";
import UserMusicService from "../services/UserMusicServices"

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const novoUsuario = await UserMusicService.readUserMusic();
        return res.json(novoUsuario);
    }catch(error){
        next(error);
    }
}
);

router.get("/:id", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const usuarioUnico = await UserMusicService.readMusicByUserId(Number(req.params.id));
        res.json(usuarioUnico);
    }catch(error){
        next(error);
    }
});

router.post("/", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const usuario = await UserMusicService.createUserMusic(req.body);
        res.json(`usuario com ID ${usuario.id} criado`);
    }catch(error){
        next(error);
    }
});

router.put("/:id", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const usuario = await UserMusicService.updateUserMusic(Number(req.params.id), req.body);
        res.json(`usuario com ID ${usuario.id} atualizado`);
    }catch(error){
        next(error);
    }
});

router.delete("/:id", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const usuario = await UserMusicService.deleteUserMusic(Number(req.params.id));
        res.json(`usuario com ID ${usuario.id} deletado`);
    }catch(error){
        next(error);
    }
});


export default router;