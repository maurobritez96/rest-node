const {Schema, model} = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {type: String},
    available: {type: Boolean, default: true},
    img: {type: String}
})

ProductSchema.methods.toJSON = function(){
    const {__v, _id, ...data} = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model('Product', ProductSchema);