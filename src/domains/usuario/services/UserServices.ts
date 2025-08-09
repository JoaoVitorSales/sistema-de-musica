// prismaClient.ts
import prisma from "../../../../config/prismaClient";
import { usuario } from "@prisma/client";

// Adiciona usuario
export async function createUsuario(data: { nome: string; senha: string; email: string; foto?: string; privilegios: boolean }) {
  return prisma.usuario.create({ data });
}

// Atualiza usuário
export async function updateUsuario(id: number, data: { nome?: string; senha?: string; email?: string; foto?: string; privilegios?: boolean }) {
  return prisma.usuario.update({
    where: { id },
    data,
  });
}

// Lê todos os usuários
export async function readUsuarios() {
  return prisma.usuario.findMany();
}

// Lê usuario por id
export async function readUsuariosByID(id:number) {
  return prisma.usuario.findUnique({where:{id}});
}

// Deleta um usuário por ID
export async function deleteUsuario(id: number) {
  return prisma.usuario.delete({where: { id }});
}

export default prisma;