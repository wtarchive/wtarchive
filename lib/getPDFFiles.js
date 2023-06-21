import fs from 'fs';
import path from 'path';

var pdfCache = null;

const getPDFFiles = (directoryPath, fileMap = {}) => {
    // if(pdfCache != null)
    //     return pdfCache;
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
        const absolutePath = path.join(directoryPath, file);
        const stat = fs.statSync(absolutePath);

        if(absolutePath.endsWith("_2.pdf")){
            if(fs.existsSync(absolutePath.replace("_2.pdf", ".pdf"))){
                console.log(`Deleting ${absolutePath}...`);
                fs.unlinkSync(absolutePath);
                continue;
            }
        }

        if (stat.isDirectory()) {
            getPDFFiles(absolutePath, fileMap);
        } else if (path.extname(file) === '.pdf') {
            const filename = path.basename(file, '.pdf');

            let relPath = absolutePath.replace(/^[\\\/]?public[\\\/]/, "");

            if(fileMap[filename] !== undefined){
                console.warn(`Duplicate filename: ${relPath} \t|\t ${fileMap[filename]}`);
            }

            fileMap[filename] = relPath;
        }
    }

    // fs.writeFileSync("public/pdfMap.json", JSON.stringify(fileMap, null, 2));

    pdfCache = fileMap;
    return fileMap;
}

export default getPDFFiles;
