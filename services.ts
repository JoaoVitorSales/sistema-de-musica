// prismaClient.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


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


// Adiciona artist
export async function createArtista(data: { nome: string; foto?: string; streams: number }) {
  return prisma.artista.create({ data });
}

// Atualiza artista 
export async function updateArtista(id: number, data: { nome?: string; foto?: string; streams?: number }) {
  return prisma.artista.update({
    where: { id },
    data,
  });
}

// Adiciona música
export async function createMusica(data: { nome: string; genero?: string; album?: string; artistaId: number }) {
  return prisma.musicas.create({ data });
}

// Atualiza música
export async function updateMusica(id: number, data: { nome?: string; genero?: string; album?: string; artistaId?: number }) {
  return prisma.musicas.update({
    where: { id },
    data,
  });
}

export default prisma;