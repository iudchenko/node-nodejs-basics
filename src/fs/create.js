import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
  const folderPath = path.join(__dirname, "files");
  const filePath = path.join(folderPath, "fresh.txt");
  const content = "I am fresh and young";

  try {
    // Check if the file already exists
    await fs.access(filePath);
    // If the file exists, throw an error
    throw new Error("FS operation failed");
  } catch (error) {
    // If the file does not exist, an error will be thrown. We catch it here.
    if (error.code === "ENOENT") {
      try {
        // Ensure the 'files' directory exists
        await fs.mkdir(folderPath, { recursive: true });

        // Write the file
        await fs.writeFile(filePath, content, "utf8");
        console.log("File created successfully");
      } catch (err) {
        // Handle potential errors during directory creation or file writing
        console.error("Error creating file:", err.message);
      }
    } else {
      // If the error is not about the file's non-existence, rethrow it
      throw error;
    }
  }
};

await create();
