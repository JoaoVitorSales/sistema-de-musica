// prismaClient.ts
import prisma from "../../../../config/prismaClient";
import { usuario } from "@prisma/client";

class UserService {
    // Adiciona usuario
    async createUser(body: usuario){
      const user = await prisma.usuario.create({
        data: { nome: body.nome, senha: body.senha, email: body.email, foto: body.foto, privilegios: body.privilegios }
      });

      return user;
    }

    // Lê todos os usuários
    async readUser(){
      const user = await prisma.usuario.findMany();
      return user;
    }

    // Lê usuario por id
    async readUserById(id: number){
      const user = await prisma.usuario.findUnique({where: {id:id}});
      return user;
    }

    // Atualiza usuário
    async updateUser(id: number ,body: usuario){
      const user = await prisma.usuario.update({
        where: {id: id}, data: { nome: body.nome, senha: body.senha, email: body.email, foto: body.foto, privilegios: body.privilegios }
      });
      return user;
    }

    // Deleta um usuário por ID
    async deleteUser(id: number){
      const user = await prisma.usuario.delete({
        where: {id: id}
      })
      return user;
    }
}

export default new UserService();