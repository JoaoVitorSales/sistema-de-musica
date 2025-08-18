import prisma from "../../../../config/prismaClient";
import { artista } from "@prisma/client";

class ArtistService {
    // Adiciona artista
    async createArtist(body: artista){
      const artist = await prisma.artista.create({
        data: { nome: body.nome, foto: body.foto, streams: body.streams }
      });
      return artist;
    }

    // Lê todos os artistas em ordem alfabética
    async readArtist(){
      const artists = await prisma.artista.findMany({
        orderBy: { nome: 'asc' } 
      });
      return artists;
    }

    // Lê artista por id
    async readArtistById(id: number){
      const artist = await prisma.artista.findUnique({where: {id:id}});
      return artist;
    }

    // Atualiza artista
    async updateArtist(id: number ,body: artista){
      const artist = await prisma.artista.update({
        where: {id: id}, 
        data: { nome: body.nome, foto: body.foto, streams: body.streams }
      });
      return artist;
    }

    // Deleta um artista por ID
    async deleteArtist(id: number){
      const artist = await prisma.artista.delete({where: {id: id}});
      return artist;
    }
}

export default new ArtistService();
