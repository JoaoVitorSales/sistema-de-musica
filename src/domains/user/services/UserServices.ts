// prismaClient.ts
import prisma from "../../../../config/prismaClient";
import { usuario } from "@prisma/client";
import bcrypt from "bcrypt";

class UserService {
    // Adiciona usuario
    async encryptPassword(password: string){
      const saltRounds = 10;
      const encrypted = await bcrypt.hash(password, saltRounds);
      return encrypted;
    }
    async createUser(body: usuario){

      const encrypted = await this.encryptPassword(body.senha)

      const user = await prisma.usuario.create({
        data: { nome: body.nome, senha: encrypted, email: body.email, foto: body.foto, privilegios: body.privilegios }
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

    async readUserSelect(id: number){
      const user = await prisma.usuario.findUnique({where: {id:id}});
      return user;
    }

    // Atualiza usuário
    async updateUser(id: number ,body: usuario){
      const user = await prisma.usuario.update({
        where: {id: id}, data: { nome: body.nome, email: body.email, foto: body.foto }
      });
      return user;
    }

    // Atualiza senha
    async updatePassword(id: number ,body: usuario){
      const encrypted = await this.encryptPassword(body.senha)
      const user = await prisma.usuario.update({
        where: {id: id}, data: { senha: encrypted }
      });
      return user;
    }

    // Deleta um usuário por ID
    async deleteUser(id: number){
      const user = await prisma.usuario.delete({
        where: {id: id}
      });
      return user;
    }
}

export default new UserService();