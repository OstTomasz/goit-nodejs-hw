import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import fs from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const PUBLIC_DIRECTORY = join(__dirname, "public");
export const UPLOAD_DIRECTORY = join(__dirname, "tmp");
export const AVATARS_DIRECTORY = join(PUBLIC_DIRECTORY, "avatars");
// export const ALLOWED_FILE_TYPES = [
//   "image/png",
//   "image/jpeg",
//   "image/jpg",
//   "image/gif",
// ];
export const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10 MB

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

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
