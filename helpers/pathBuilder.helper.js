const path = require('path');
const uuid = require('uuid').v1;
const fs = require('fs');
const { promisify } = require('util');

const mkdirPromise = promisify(fs.mkdir);

module.exports = {
  filePathBuilder: async (fileName, itemId, itemType, fileType) => {
    const pathWithouthStatic = path.join(itemType, itemId.toString(), fileType);
    const uploadPath = path.join(process.cwd(), 'static', pathWithouthStatic);
    const fileExtension = fileName.split('.').pop();
    const fileNameExt = `${uuid()}.${fileExtension}`;
    const finalPath = path.join(uploadPath, fileNameExt);

    await mkdirPromise(uploadPath, { recursive: true });

    return {
      finalPath,
      filePath: path.join(pathWithouthStatic, fileNameExt),
      fileNameExt,
      uploadPath
    };
  },
};
