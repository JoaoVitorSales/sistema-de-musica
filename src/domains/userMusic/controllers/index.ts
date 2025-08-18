import { Router, Request, Response, NextFunction } from "express";
import UserMusicService from "../services/UserMusicServices";
import { verifyJWT, checkRole } from "../../middlewares/auth";

const router = Router();

// Usuário vê suas músicas ouvidas
router.get("/", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuariosId = req.user?.id;

        // Pega todas as músicas ouvidas e filtra pelo usuário logado
        const musicas = await UserMusicService.readUserMusic();
        const minhasMusicas = musicas.filter(m => m.usuariosId === usuariosId);

        res.json(minhasMusicas);
    } catch (error) {
        next(error);
    }
});

// Admin vê música de qualquer usuário pelo ID do registro
router.get("/:id", verifyJWT, checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const registro = await UserMusicService.readMusicByUserId(id);
        res.json(registro);
    } catch (error) {
        next(error);
    }
});

// Usuário adiciona música ouvida
router.post("/", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuariosId = req.user?.id;
        const musicaId = Number(req.body.musicaId);

        const registro = await UserMusicService.createUserMusic({ usuariosId, musicaId } as any);
        res.json(`Música adicionada à lista de músicas ouvidas com ID ${registro.id}`);
    } catch (error) {
        next(error);
    }
});

// Admin atualiza registro de música ouvida
router.put("/:id", verifyJWT, checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const usuariosId = Number(req.body.usuariosId);
        const musicaId = Number(req.body.musicaId);

        const registro = await UserMusicService.updateUserMusic(id, { usuariosId, musicaId } as any);
        res.json(`Registro de música ouvida com ID ${registro.id} atualizado`);
    } catch (error) {
        next(error);
    }
});

// Usuário remove música ouvida (pelo ID do registro)
router.delete("/:id", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);

        const registro = await UserMusicService.deleteUserMusic(id);
        res.json(`Música removida da lista de músicas ouvidas com ID ${registro.id}`);
    } catch (error) {
        next(error);
    }
});

export default router;

