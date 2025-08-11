import {Router, Request, Response, NextFunction} from "express";
import MusicServices from "../../music/services/MusicServices";

const router = Router();

router.get("/", async (req:Request, res: Response, next: NextFunction) => {
    try {
        const newMusic = await MusicServices.readMusic();
        return res.json(newMusic);
    } catch(error) {
        next(error);
    }
});

router.get("/:id", async(req: Request, res: Response, next: NextFunction) => {
    try{
        const usuarioUnico = await MusicServices.readMusicById(Number(req.params.id));
        res.json(usuarioUnico);
    }catch(error){
        next(error);
    }
});

router.post("/", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicServices.createMusic(req.body);
        res.json(`musica com nome ${music.nome} criada`);
    } catch(error) {
        next(error);
    }
});

router.put("/:id", async(req: Request, res: Response, next:NextFunction) => {
    try{
        const music = await MusicServices.updateMusic(Number(req.params.id), req.body);
        res.json(`musica com nome ${music.nome} atualizada`);
    } catch(error) {
        next(error);
    }
});

router.delete("/:id", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicServices.deleteMusic(Number(req.params.id));
        res.json(`musica com nome ${music.nome} deletada`);
    } catch(error) {
        next(error);
    }
});

export default router;