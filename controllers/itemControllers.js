const model = require('../models/item');
const { upload } = require('../middleware/fileUpload');

// show items on items page
exports.display = (req, res, next) => {

    let query = {}
    if(req.query.search !== undefined && req.query.search.trim() !== ""){
        const search = req.query.search.toLowerCase();

        query = {
            $or: [
                {title: { $regex: search, $options: 'i' } },
                {details: { $regex: search, $options: 'i' } } 
            ]
        }
    }

    model.find(query).sort({price: 1})
    .then(items => res.render('./item/items', {items}))
    .catch(err => next(err))
};

// show page for making a new item
exports.new = (req, res) => {
    res.render('./item/new');
}

// show page for item details
exports.show = (req, res, next) => {
    let id = req.params.id;
    // if(!id.match(/^[0-9a-fA-F]{24}$/)){
    //     let err = new Error('Invalid item id');
    //     err.status = 400;
    //     return next(err);
    // } 
    model.findById(id).populate('seller', 'firstName lastName')
    .then(item => {
        if(item){
            res.render('./item/item', {item});
        }else {
            let err = new Error('Cannot find an item with ID ' + id);
            err.status = 404;
            next(err);
        }
    })
    
}

exports.create = (req, res, next) => {
    upload(req, res, (err) =>{
        if(err){
            res.status(400);
            return next(err);
        }
        let item = new model(req.body);
        item.seller = req.session.user;
        console.log(item.seller);
        item.image = '/images/' + req.file.filename;
        item.save()
        .then(() =>{
            req.flash('success', 'Item created!');

            res.redirect('/items')
        })
        .catch(err => {
            if(err.name === 'ValidationError'){
                err.status = 400;
                req.flash('error', err.message);
                return res.redirect('/items/new');
            }
            next(err);
        });
    });
}

exports.edit = (req, res, next) => {
    let id = req.params.id;

    
    model.findById(id)
    .then(item => {
        if(item){
        res.render('./item/edit', {item});
        }else {
            let err = new Error('Cannot find an item with ID ' + id);
            err.status = 404;
            next(err);
        }
    });  
}

exports.update = (req, res, next) => {
    upload(req, res, (err) => {
        if(err){
            res.status(400);
        }
        let item = req.body;
        let id = req.params.id;

        model.findByIdAndUpdate(id, item, {useFindAndModify: false, runValidators: true})
        .then(item => {
            if(item){
            req.flash('success', 'Item updated!'); 
                res.redirect('/items/' + id);
            }else{
                let err = new Error('Cannot find an item with ID ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => {
            if(err.name === 'ValidationError'){
                err.status = 400;
            }
            next(err)
        })
    });
}

exports.delete = (req, res, next) => {
    let id = req.params.id;

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(item => {
        if(item){
            req.flash('success', 'Item deleted!'); 
            res.redirect('/items');
        }else{
            let err = new Error('Cannot find an item with ID' + id);
            err.status = 404;
            next(err);
        }
    }) 
    .catch(err => next(err));
}