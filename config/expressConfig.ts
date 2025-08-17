import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import usuarioRoutes from "../src/domains/user/controllers";
import musicaRoutes from "../src/domains/music/controllers";
import artistRoutes from "../src/domains/artist/controllers";
import UserMusicRoutes from "../src/domains/userMusic/controllers";
import cookieParser from "cookie-parser";


dotenv.config()

export const app: Express = express();

const options: CorsOptions = {
    credentials: true,
    origin: process.env.APP_URL
};

app.use(cors(options))
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use("/api/usuario", usuarioRoutes)
app.use("/api/artista", artistRoutes)
app.use("/api/musica", musicaRoutes)
app.use("/api/listagem", UserMusicRoutes)