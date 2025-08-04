import { createUsuario, createArtista, createMusica } from "./services";

async function main() {
const novoUsuario = await createUsuario({
        nome: 'João Silva',
        email: 'joao.silva@email.com',
        senha: 'senhaSuperSegura123',
        privilegios: false
    });
    console.log(`Usuário criado: ${novoUsuario.nome}`);

const artista = await createArtista({
      nome: 'Charlie Brown Jr.',
      streams: 4000000
    });
    console.log(`Artista criado: ${artista.nome}`);

const musica = await createMusica({
      nome: 'Céu Azul',
      album: 'Música Popular Caiçara',
      artistaId: artista.id // Conectando ao artista criado
    });
    console.log(`Música criada: ${musica.nome}`);

}

main();