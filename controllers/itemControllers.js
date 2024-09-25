const model = require('../models/item');

exports.display = (req, res) => {
    let items = model.find();
    res.render('./item/items', {items});
    console.log('using display controller');
};

exports.new = (req, res) => {
    res.render('./item/new');
    console.log('using new export controller');
}