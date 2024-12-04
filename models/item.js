const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: {type: String, required: [true, 'Title is required']},
    seller: {type: Schema.Types.ObjectId, ref: 'User'},
    condition: {type: String, required: [true, 'Condition is required']},
    price: {type: Number, required: [true, 'Price is required']},
    details: {type: String, required: [true, 'Details are required']},
    image: {type: String, required: [true, 'Image is required']},
    active: {type: Boolean, default: true}
});

module.exports = mongoose.model('Item', itemSchema);
