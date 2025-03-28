const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const  fileUpload  = require('express-fileupload');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';
        this.categoriesPath = '/api/categories';
        this.productsPath = '/api/products';
        this.searchPath = '/api/search';
        this.uploadsPath = '/api/uploads';

        // db
        this.connectDB();

        // middlewares
        this.middlewares();

        // routes
        this.routes()
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json())

        // Directorio publico
        this.app.use(express.static('public'));

        // subir archivos file-upload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use(this.usersPath, require('../routes/users'));
        this.app.use(this.searchPath, require('../routes/search'));
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.categoriesPath, require('../routes/categories'));
        this.app.use(this.productsPath, require('../routes/products'));
        this.app.use(this.uploadsPath, require('../routes/uploads'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        })
    }
}

module.exports = Server;