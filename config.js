import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import fs from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const PUBLIC_DIRECTORY = join(__dirname, "public");
export const UPLOAD_DIRECTORY = join(__dirname, "uploads");
export const AVATARS_DIRECTORY = join(__dirname, "avatars");
export const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/gif"];
export const AVATAR_DEFAULT_PATH = "/avatars/default-avatar.png";
export const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10 MB

console.log(AVATARS_DIRECTORY);

const isAccessible = (dir) =>
  fs
    .access(dir)
    .then(() => true)
    .catch(() => false);

export const initDirectory = async (dir) => {
  if (await isAccessible(dir)) {
    return console.log(`Directory '${dir}' already exists.`);
  }

  console.log(`Initializing directory '${dir}'...`);
  await fs.mkdir(dir);
};
