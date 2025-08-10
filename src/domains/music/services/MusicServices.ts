// prismaClient.ts
import prisma from "../../../../config/prismaClient";
import { musicas } from "@prisma/client";

class MusicService {
    // Adiciona músicas
    async createMusic(body: musicas){
      const music = await prisma.musicas.create({
       data: { nome: body.nome, genero: body.genero, album: body.album, artistaId: body.artistaId }
      });

      return music;
    }

    // Lê todos as músicas
    async readMusic(){
      const music = await prisma.musicas.findMany();
      return music;
    }

    // Lê músicas por id
    async readMusicById(id: number){
      const music = await prisma.musicas.findUnique({where: {id:id}});
      return music;
    }

    // Atualiza músicas
    async updateMusic(id: number ,body: musicas){
      const music = await prisma.musicas.update({
        where: {id: id}, data: { nome: body.nome, genero: body.genero, album: body.album, artistaId: body.artistaId }
      });
      return music;
    }

    // Deleta um músicas por ID
    async deleteMusic(id: number){
      const music = await prisma.musicas.delete({
        where: {id: id}
      })
      return music;
    }
}

export default new MusicService();