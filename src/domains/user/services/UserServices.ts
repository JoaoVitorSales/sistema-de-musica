import prisma from "../../../../config/prismaClient";
import { usuario } from "@prisma/client";
import bcrypt from "bcrypt";

class UserService {
    // Criptografa senha
    async encryptPassword(password: string){
      const saltRounds = 10;
      return await bcrypt.hash(password, saltRounds);
    }

    // Cria usuário
    async createUser(body: usuario){
      const encrypted = await this.encryptPassword(body.senha);
      const user = await prisma.usuario.create({
        data: { nome: body.nome, senha: encrypted, email: body.email, foto: body.foto, privilegios: body.privilegios }
      });
      return user;
    }

    // Lê todos os usuários em ordem alfabética
    async readUser(){
      const users = await prisma.usuario.findMany({
        orderBy: { nome: 'asc' }
      });
      return users;
    }

    // Lê usuário por id
    async readUserById(id: number){
      const user = await prisma.usuario.findUnique({where: {id:id}});
      return user;
    }

    // Atualiza usuário
    async updateUser(id: number ,body: usuario){
      const user = await prisma.usuario.update({
        where: {id: id}, 
        data: { nome: body.nome, senha: body.senha, email: body.email, foto: body.foto, privilegios: body.privilegios }
      });
      return user;
    }

    // Deleta usuário
    async deleteUser(id: number){
      const user = await prisma.usuario.delete({where: {id: id}});
      return user;
    }
}

export default new UserService();
