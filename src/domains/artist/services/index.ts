import { Router, Request, Response, NextFunction } from "express";
import ArtistService from '../services/ArtistServices';


const router = Router();

// Ler todos os artistas
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artistas = await ArtistService.readArtist();
        return res.json(artistas);
    } catch (error) {
        next(error);
    }
});

// Ler artista por ID
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artista = await ArtistService.readArtistById(Number(req.params.id));
        return res.json(artista);
    } catch (error) {
        next(error);
    }
});

// Criar artista
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artista = await ArtistService.createArtist(req.body);
        return res.json(`Artista com nome ${artista.nome} criado`);
    } catch (error) {
        next(error);
    }
});

// Atualizar artista
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artista = await ArtistService.updateArtist(Number(req.params.id), req.body);
        return res.json(`Artista com nome ${artista.nome} atualizado`);
    } catch (error) {
        next(error);
    }
});

// Deletar artista
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artista = await ArtistService.deleteArtist(Number(req.params.id));
        return res.json(`Artista com nome ${artista.nome} deletado`);
    } catch (error) {
        next(error);
    }
});

export default router;
