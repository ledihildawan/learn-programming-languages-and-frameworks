import { createJiti } from "jiti";

const jiti = createJiti(Bun.fileURLToPath(import.meta.url));

export async function envConfig() {
  const nameFiles = ["client", "server"];

  for (const nameFile of nameFiles) {
    await jiti.import(`./${nameFile}.ts`);
  }
}
