import { readFile } from "fs/promises";

export default async function getPackageJsonInfo() {
  try {
    const data = await readFile("package.json", "utf8");
    const packageJson = JSON.parse(data);

    return packageJson;
  } catch (err) {
    console.error("Error reading package.json:", err);
    return null;
  }
}
