import {Router, Request, Response, NextFunction} from "express";
import UserService from "../services/UserServices"
import { login, logout, notLoggedIn, verifyJWT, checkRole } from "../../middlewares/auth";

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

router.get("/", verifyJWT, checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarios = await UserService.readUser();
        res.json(usuarios);
    } catch (error) {
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
//Visualizar usuário específico (admin ou dono da conta)
router.get("/:id", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarioId = Number(req.params.id);

        // Verifica se é admin ou se é o próprio usuário
        if (req.user?.id !== usuarioId && !req.user?.privilegios) {
            return res.status(403).json({ message: "Acesso negado" });
        }

        const usuario = await UserService.readUserById(usuarioId);
        res.json(usuario);
    } catch (error) {
        next(error);
    }
});

//Criar usuário (apenas admin)
router.post("/", verifyJWT, checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuario = await UserService.createUser(req.body);
        res.json({ message: `Usuário ${usuario.nome} criado com sucesso` });
    } catch (error) {
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

//Atualizar usuário (admin ou dono da conta)
router.put("/:id", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarioId = Number(req.params.id);

        if (req.user?.id !== usuarioId && !req.user?.privilegios) {
            return res.status(403).json({ message: "Acesso negado" });
        }

        const usuario = await UserService.updateUser(usuarioId, req.body);
        res.json({ message: `Usuário ${usuario.nome} atualizado com sucesso` });
    } catch (error) {
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

//Deletar usuário (admin ou dono da conta)
router.delete("/:id", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarioId = Number(req.params.id);

        if (req.user?.id !== usuarioId && !req.user?.privilegios) {
            return res.status(403).json({ message: "Acesso negado" });
        }

        const usuario = await UserService.deleteUser(usuarioId);
        res.json({ message: `Usuário ${usuario.nome} deletado com sucesso` });
    } catch (error) {
        next(error);
    }
});

export default router;
