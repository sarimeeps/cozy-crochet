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

exports.show = (req, res, next) => {
    let id = req.params.id;
    let item = model.findById(id);
    if(item){
        res.render('./item/item', {item});
        console.log('using show export controller');
    } else {
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
    }
}