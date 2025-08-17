// prismaClient.ts
import prisma from "../../../../config/prismaClient";
import { usuarioMusica } from "@prisma/client";

class UserService {
    // Adiciona usuarioMusica
    async createUserMusic(body: usuarioMusica){
      const user = await prisma.usuarioMusica.create({
        data: { musicaId: body.musicaId, usuariosId: body.usuariosId }
      });

      return user;
    }

    // Lê todas as entidades usuariomusica
    async readUserMusic(){
      const user = await prisma.usuarioMusica.findMany();
      return user;
    }

    // Lê a entidade usuarioMusica por id
    async readMusicByUserId(id: number){
      const user = await prisma.usuarioMusica.findUnique({where: {id:id}});
      return user;
    }

    // Atualiza a entidade usuárioMusica
    async updateUserMusic(id: number ,body: usuarioMusica){
      const user = await prisma.usuarioMusica.update({
        where: {id: id}, data: { musicaId: body.musicaId, usuariosId: body.usuariosId }
      });
      return user;
    }

    // Deleta uma instancia da entidade usuáriomusica por ID
    async deleteUserMusic(id: number){
      const user = await prisma.usuarioMusica.delete({
        where: {id: id}
      })
      return user;
    }
}

export default new UserService();