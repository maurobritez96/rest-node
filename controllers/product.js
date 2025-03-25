const {Product} = require('../models');

const getProducts = async (req, res) => {
    const {limit = 5, from = 0} = req.query;
    const query = {status: true};

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('category', 'name')
            .skip(Number(from))
            .limit(Number(limit)
        )
    ]);
    res.json({
        total,
        products
    })
    
}

const getProductsByCategory = async (req, res) => {
    const {limit = 5, from = 0} = req.query;
    const query = {status: true, category: req.params.id};

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('category', 'name')
            .skip(Number(from))
            .limit(Number(limit)
        )
    ]);
    res.json({
        total,
        products
    })
    
}

const getProduct = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id).populate('user', 'name');
    
    res.json({
        product
    })
    
}

const createProduct = async (req, res) => {
    const {user, status, ...body } = req.body;


    const product = await Product.findOne({name: body.name});
    if(product){
        return res.status(400).json({
            msg: `The product ${product.name} already exists`
        })
    }
    
    // Generate data to save
    const data = {
        ...body,
        user: req.user._id
    }

    const newProduct = new Product(data);
    await newProduct.save();

    res.json({
        msg: 'Product created',
        newProduct
    })
}
const updateProduct = async (req, res) => {
    const {id} = req.params;
    const {status, user, ...data} = req.body;
    data.name.toUpperCase();

    const product
    = await Product.findByIdAndUpdate(id, data,
        {new: true}
    );

    res.json({
        product
    })
}
const deleteProduct = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, {status: false});
   res.json({
       product
   })
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory
}