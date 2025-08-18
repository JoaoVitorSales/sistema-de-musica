import prisma from "../../../../config/prismaClient";
import { usuarioMusica } from "@prisma/client";

class UserMusicService {
    // Adiciona usuárioMusica
    async createUserMusic(body: { usuariosId: number, musicaId: number }){
      const registro = await prisma.usuarioMusica.create({
        data: { usuariosId: body.usuariosId, musicaId: body.musicaId }
      });
      return registro;
    }

    // Lê todas as entidades usuariomusica
    async readUserMusic(){
      const registros = await prisma.usuarioMusica.findMany();
      return registros;
    }

    // Lê a entidade usuarioMusica por id
    async readMusicByUserId(id: number){
      const registro = await prisma.usuarioMusica.findUnique({where: {id:id}});
      return registro;
    }

    // Atualiza a entidade usuárioMusica
    async updateUserMusic(id: number ,body: { usuariosId: number, musicaId: number }){
      const registro = await prisma.usuarioMusica.update({
        where: {id: id}, 
        data: { usuariosId: body.usuariosId, musicaId: body.musicaId }
      });
      return registro;
    }

    // Deleta uma instancia da entidade usuáriomusica por ID
    async deleteUserMusic(id: number){
      const registro = await prisma.usuarioMusica.delete({where: {id: id}});
      return registro;
    }
}

export default new UserMusicService();
