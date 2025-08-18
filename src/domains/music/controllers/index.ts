import { Router, Request, Response, NextFunction } from "express";
import MusicServices from "../../music/services/MusicServices";
import { verifyJWT, checkRole } from "../../middlewares/auth";

const router = Router();

//Listar todas as músicas (apenas admin)
router.get("/", verifyJWT, checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musicas = await MusicServices.readMusic();
        res.json(musicas);
    } catch (error) {
        next(error);
    }
});

//Visualizar música específica (apenas admin)
router.get("/:id", verifyJWT, checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musica = await MusicServices.readMusicById(Number(req.params.id));
        res.json(musica);
    } catch (error) {
        next(error);
    }
});

//Criar música (apenas admin)
router.post("/", verifyJWT, checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicServices.createMusic(req.body);
        res.json(`Música com nome ${music.nome} criada`);
    } catch (error) {
        next(error);
    }
});

//Atualizar música (apenas admin)
router.put("/:id", verifyJWT, checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicServices.updateMusic(Number(req.params.id), req.body);
        res.json(`Música com nome ${music.nome} atualizada`);
    } catch (error) {
        next(error);
    }
});

//Deletar música (apenas admin)
router.delete("/:id", verifyJWT, checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicServices.deleteMusic(Number(req.params.id));
        res.json(`Música com nome ${music.nome} deletada`);
    } catch (error) {
        next(error);
    }
});

export default router;
