import fs from "fs";

function ReadDir(directory: fs.PathLike): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(directory, (err, files) => {
            if(err) {
                return reject(err)
            } else {
                return resolve(files)
            }
        })
    })
}

function deleteFile(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if(err) {
                reject(err)
            }

            resolve()
        })
    })
}

export {
    ReadDir,
    deleteFile
}
