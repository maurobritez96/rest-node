const {v4: uuidv4} = require('uuid');
const path = require('path');

const filesUpload = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {
    
   return new Promise( (resolve, reject) => {
        const {file} = files;
        const splitName = file.name.split('.');
        const extension = splitName[splitName.length - 1];

        // Validate extension
        if (!validExtensions.includes(extension)) {
            return reject(`Invalid extension. Valid extensions are: ${validExtensions}`)
        }

        const fileName = `${uuidv4()}.${extension}`;

        const uploadPath = path.join(__dirname, '../uploads/', folder, fileName);

        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve(fileName);
        });;
    });
}

module.exports = {
    filesUpload
}