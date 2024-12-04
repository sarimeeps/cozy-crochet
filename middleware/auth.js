const Item = require('../models/item');

exports.isGuest = (req, res, next) => {
    if(!req.session.user){
        return next();
    }else{
        req.flash('error', 'You are already logged in');
        return res.redirect('/users/profile');
    }
}

exports.isLoggedIn = (req, res, next) => {
    if(req.session.user){
        return next();
    }else{
        req.flash('error', 'You need to log in first');
        return res.redirect('/users/login');
    }
}

exports.isSeller = (req, res, next) => {
    let id = req.params.id;

    Item.findById(id)
    .then(item => {
        if(item){
            if(item.seller == req.session.user){
                return next();
            }else{
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        }else{
            let err = new Error('Cannot find an item with id ' + id);
            err.status = 401;
            return next(err);
        }
    })
    .catch(err=>next(err))
}

exports.validateId = (req, res, next) => {
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid item id');
        err.status = 400;
        return next(err);
    }else{
        return next();
    }
}