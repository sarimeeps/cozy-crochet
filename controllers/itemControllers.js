const model = require('../models/item');

exports.display = (req, res) => {
    let items = model.find();
    res.render('./item/items', {items});
};