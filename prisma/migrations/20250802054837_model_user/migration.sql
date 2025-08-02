-- CreateTable
CREATE TABLE "usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "foto" TEXT,
    "privilegios" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "artista" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "foto" TEXT,
    "streams" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "musicas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "genero" TEXT,
    "album" TEXT,
    "artistaId" INTEGER NOT NULL,
    CONSTRAINT "musicas_artistaId_fkey" FOREIGN KEY ("artistaId") REFERENCES "artista" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "usuarioMusica" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "musicaId" INTEGER NOT NULL,
    "usuariosId" INTEGER NOT NULL,
    CONSTRAINT "usuarioMusica_musicaId_fkey" FOREIGN KEY ("musicaId") REFERENCES "musicas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "usuarioMusica_usuariosId_fkey" FOREIGN KEY ("usuariosId") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");
