const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';
        this.categoriesPath = '/api/categories';
        this.productsPath = '/api/products';
        this.searchPath = '/api/search';

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
    }

    routes(){
        this.app.use(this.usersPath, require('../routes/users'));
        this.app.use(this.searchPath, require('../routes/search'));
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.categoriesPath, require('../routes/categories'));
        this.app.use(this.productsPath, require('../routes/products'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        })
    }
}

module.exports = Server;