const fs = require("fs");
const path = require("path");

function convertDirectoryToJson(directoryPath) {
  const result = {};

  function traverseDirectory(dirPath, currentObj) {
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const fileStat = fs.statSync(filePath);

      if (fileStat.isDirectory()) {
        const newFolder = {};
        traverseDirectory(filePath, newFolder);
        if (Object.keys(newFolder).length) currentObj[file] = newFolder;
      } else if (fileStat.isFile() && path.extname(filePath).toLowerCase() === ".pdf") {
        const basename = path.basename(filePath, ".pdf");
        currentObj[basename] = "pdf";
      }
    }
  }

  traverseDirectory(directoryPath, result);
  return result;
}


export default convertDirectoryToJson;
