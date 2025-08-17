-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "foto" TEXT,
    "privilegios" TEXT NOT NULL
);
INSERT INTO "new_usuario" ("email", "foto", "id", "nome", "privilegios", "senha") SELECT "email", "foto", "id", "nome", "privilegios", "senha" FROM "usuario";
DROP TABLE "usuario";
ALTER TABLE "new_usuario" RENAME TO "usuario";
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
