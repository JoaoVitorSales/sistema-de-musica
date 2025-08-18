import { Router, Request, Response, NextFunction } from "express";
import ArtistService from "../services/ArtistServices";
import { verifyJWT, checkRole } from "../../middlewares/auth";

const router = Router();

//Ler todos os artistas (apenas admin)
router.get("/", verifyJWT, checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artistas = await ArtistService.readArtist();
        res.json(artistas);
    } catch (error) {
        next(error);
    }
});

//Ler artista por ID (apenas admin)
router.get("/:id", verifyJWT, checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artista = await ArtistService.readArtistById(Number(req.params.id));
        res.json(artista);
    } catch (error) {
        next(error);
    }
});

//Criar artista (apenas admin)
router.post("/", verifyJWT, checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artista = await ArtistService.createArtist(req.body);
        res.json(`Artista com nome ${artista.nome} criado`);
    } catch (error) {
        next(error);
    }
});

//Atualizar artista (apenas admin)
router.put("/:id", verifyJWT, checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artista = await ArtistService.updateArtist(Number(req.params.id), req.body);
        res.json(`Artista com nome ${artista.nome} atualizado`);
    } catch (error) {
        next(error);
    }
});

//Deletar artista (apenas admin)
router.delete("/:id", verifyJWT, checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artista = await ArtistService.deleteArtist(Number(req.params.id));
        res.json(`Artista com nome ${artista.nome} deletado`);
    } catch (error) {
        next(error);
    }
});

export default router;

