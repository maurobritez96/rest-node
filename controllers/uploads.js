const path = require('path');
const fs = require('fs');
const { filesUpload } = require("../helpers/files-upload");
const { User, Product } = require("../models");

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const fileUpload = async (req, res) => {

    try {
        // txt, md
        // const fileName = await filesUpload(req.files, ['txt', 'md'], 'textos');
        // images
        const fileName = await filesUpload(req.files, undefined, 'images');
        
        res.json({fileName});
    } catch (msg) {
        res.status(400).json({msg});
    }

}

const updateImage = async (req, res) => {
    
    const {id, collection} = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({msg: `There is no user with the id ${id}`});
            }
            break;
    
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({msg: `There is no product with the id ${id}`});
            }
            break
        default:
            return res.status(500).json({msg: 'I forgot to validate this'});
    }

    // limpiar imagenes previas
    if (model.img) {
        // borrar imagen del servidor
        const imagePath = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }

    const fileName = await filesUpload(req.files, undefined, collection);
    model.img = fileName;
    await model.save();

    res.json({model});

}

const showImage = async (req, res) => {
    const {id, collection} = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({msg: `There is no user with the id ${id}`});
            }
            break;
    
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({msg: `There is no product with the id ${id}`});
            }
            break
        default:
            return res.status(500).json({msg: 'I forgot to validate this'});
    }

    // limpiar imagenes previas
    if (model.img) {
        // borrar imagen del servidor
        const imagePath = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(imagePath)) {
            res.sendFile(imagePath);
            return;
        }
    }

    const pathImage = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImage);
}

const updateImageCloudinary = async (req, res) => {
    
    const {id, collection} = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({msg: `There is no user with the id ${id}`});
            }
            break;
    
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({msg: `There is no product with the id ${id}`});
            }
            break
        default:
            return res.status(500).json({msg: 'I forgot to validate this'});
    }

    // limpiar imagenes previas
    if (model.img) {
        // borrar imagen del servidor
        const nameArr = model.img.split('/');
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    const {tempFilePath} = req.files.file;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
    model.img = secure_url;
    await model.save();

    res.json(model);

}

module.exports = {
    fileUpload,
    updateImage,
    showImage,
    updateImageCloudinary
}