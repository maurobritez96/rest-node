

const getCategories = async (req, res) => {
    res.json({
        msg: 'All categories'
    })
    
}

const getCategory = async (req, res) => {
    res.json({
        msg: 'One category by id'
    })
    
}

const createCategory = async (req, res) => {
    res.json({
        msg: 'Create category'
    })
}
const updateCategory = async (req, res) => {
    res.json({
        msg: 'Update category'
    })
}
const deleteCategory = async (req, res) => {
   res.json({
       msg: 'Delete category'
   })
}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}