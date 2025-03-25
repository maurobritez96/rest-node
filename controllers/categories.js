const Category = require('../models/category');

const getCategories = async (req, res) => {
    const {limit = 5, from = 0} = req.query;
    const query = {status: true};

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit)
        )
    ]);
    res.json({
        total,
        categories
    })
    
}

const getCategory = async (req, res) => {
    const {id} = req.params;
    const category = await Category.findById(id).populate('user', 'name');

    res.json({
        category
    })
    
}

const createCategory = async (req, res) => {
    const {name} = req.body;
    name.toUpperCase();
    const category = await Category.findOne({name});
    if(category){
        return res.status(400).json({
            msg: `The category ${category.name} already exists`
        })
    }

    // Generate data to save
    const data = {
        name,
        user: req.user._id
    }

    const newCategory = new Category(data);
    await newCategory.save();

    res.json({
        msg: 'Category created',
        newCategory
    })
}
const updateCategory = async (req, res) => {
    const {id} = req.params;
    const {status, user, ...data} = req.body;
    data.name.toUpperCase();

    const category
    = await Category.findByIdAndUpdate(id, data,
        {new: true}
    );

    res.json({
        category
    })
}
const deleteCategory = async (req, res) => {
    const {id} = req.params;
    const category = await Category.findByIdAndUpdate(id, {status: false});
   res.json({
       category
   })
}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}