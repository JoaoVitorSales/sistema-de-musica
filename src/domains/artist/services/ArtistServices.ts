// prismaClient.ts
import prisma from "../../../../config/prismaClient";
import { artista } from "@prisma/client";

class ArtistService {
    // Adiciona artista
    async createArtist(body: artista){
      const music = await prisma.artista.create({
       data: { nome: body.nome, foto: body.foto, streams: body.streams }
      });

      return music;
    }

    // Lê todos os artistas
    async readArtist(){
      const music = await prisma.artista.findMany();
      return music;
    }

    // Lê artista por id
    async readArtistById(id: number){
      const music = await prisma.artista.findUnique({where: {id:id}});
      return music;
    }

    // Atualiza artista
    async updateArtist(id: number ,body: artista){
      const music = await prisma.artista.update({
        where: {id: id}, data: { nome: body.nome, foto: body.foto, streams: body.streams }
      });
      return music;
    }

    // Deleta um artista por ID
    async deleteArtist(id: number){
      const music = await prisma.artista.delete({
        where: {id: id}
      })
      return music;
    }
}

export default new ArtistService();