import path from "path";
import process from "node:process";
import fs from "fs";
import * as dotenv from "dotenv";

export const updateEnvFile = (key: string, value: string) => {
  const envPath = path.resolve(process.cwd(), '.env');

  let envContents = '';
  if (fs.existsSync(envPath)) {
    envContents = fs.readFileSync(envPath, 'utf8');
  }

  const keyRegex = new RegExp(`^${key}=.*$`, 'gm');

  if (keyRegex.test(envContents)) {
    envContents = envContents.replace(keyRegex, `${key}=${value}`);
  } else {
    envContents += `\n${key}=${value}`;
  }

  fs.writeFileSync(envPath, envContents.trim() + '\n');

  dotenv.config({ override: true });
}
