import prisma from "../../../../config/prismaClient";
import { musicas } from "@prisma/client";

class MusicService {
    // Adiciona música
    async createMusic(body: musicas){
      const music = await prisma.musicas.create({
        data: { nome: body.nome, genero: body.genero, album: body.album, artistaId: body.artistaId }
      });
      return music;
    }

    // Lê todas as músicas em ordem alfabética
    async readMusic(){
      const musics = await prisma.musicas.findMany({
        orderBy: { nome: 'asc' }
      });
      return musics;
    }

    // Lê músicas por id
    async readMusicById(id: number){
      const music = await prisma.musicas.findUnique({where: {id:id}});
      return music;
    }

    // Lê músicas de um artista específico em ordem alfabética
    async readMusicByArtistId(artistaId: number){
      const musics = await prisma.musicas.findMany({
        where: { artistaId },
        orderBy: { nome: 'asc' }
      });
      return musics;
    }

    // Atualiza música
    async updateMusic(id: number ,body: musicas){
      const music = await prisma.musicas.update({
        where: {id: id}, 
        data: { nome: body.nome, genero: body.genero, album: body.album, artistaId: body.artistaId }
      });
      return music;
    }

    // Deleta música por ID
    async deleteMusic(id: number){
      const music = await prisma.musicas.delete({where: {id: id}});
      return music;
    }
}

export default new MusicService();
