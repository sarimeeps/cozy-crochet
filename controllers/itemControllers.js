const model = require('../models/item');
const { v4: uuidv4} = require('uuid');
const { upload } = require('../middleware/fileUpload');

// show items on items page
exports.display = (req, res) => {
    let items = model.find();
    res.render('./item/items', {items});
    console.log('using display controller');
};

// show page for making a new item
exports.new = (req, res) => {
    res.render('./item/new');
    console.log('using new export controller');
}

// show page for item details
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

exports.create = (req, res) => {
    upload(req, res, (err) =>{
        if(err){
            res.status(400);
        }
        let item = req.body;
        item.id = uuidv4();
        item.image = '/images/' + req.file.filename;
        model.save(item);
        res.redirect('/items')
    }) 
}

exports.edit = (req, res, next) => {
    let id = req.params.id;
    let item = model.findById(id);
    console.log("edit controller used");
    if(item){
        res.render('./item/edit', {item});
    } else {
        let err = new Error('Cannot find an item with id', + id);
        err.status = 404;
        next(err);
    }
}

exports.update = (req, res, next) => {
    upload(req, res, (err) => {
        if(err){
            res.status(400);
        }
        let item = req.body;
        let id = req.params.id;
        
        let editItem = model.findById(id);
        console.log("image: ", editItem.image);
            if(req.file){
                item.image = '/images/' + req.file.filename;
            }
            if(model.updateById(id, item)){
                console.log("Image: ",item.image);
                res.redirect('/items/' + id);
            }else{
                let err = new Error('Cannot find a story with id' + id);
                err.status = 404;
                next(err);
            }
    });
}

exports.delete = (req, res, next) => {
    let id = req.params.id;
    if(model.deleteById(id)){
        res.redirect('/items');
    }else{
        let err = new Error('Cannot find a story with ' + id);
        err.status = 404;
        next(err);
    }
}