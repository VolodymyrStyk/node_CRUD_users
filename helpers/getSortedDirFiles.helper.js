const fs = require('fs');
const { promisify } = require('util');

const readDirPromise = promisify(fs.readdir);

module.exports = {
  getSortedFiles: async (dir) => {
    const files = await readDirPromise(dir);

    return files
      .map((fileName) => ({
        name: fileName,
        time: fs.statSync(`${dir}/${fileName}`).mtime.getTime(),
      }))
      .sort((a, b) => b.time - a.time)
      .map((file) => file.name);
  }
};
