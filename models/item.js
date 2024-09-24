const {v4: uuidv4} = require('uuid');

const items = [
    {
        id: '1',
        title: 'Cat Bus Hat',
        seller: 'Mai',
        condition: 'Good',
        price: '20.99',
        details: 'lorem blah blah',
        image: '../images/item-1.jpg',
        active: 'true'
    },
    {
        id: '2',
        title: 'Ghibli Top & Cardigan',
        seller: 'Totoro',
        condition: 'New',
        price: '65.99',
        details: 'lorem blah blah',
        image: '../images/item-2.jpg',
        active: 'true'
    },
    {
        id: '3',
        title: 'Floral Trio Keychain',
        seller: 'Sophie',
        condition: 'Other',
        price: '15.00',
        details: 'lorem blah blah',
        image: '../images/item-3.jpg',
        active: 'true'
    },
    {
        id: '4',
        title: 'Crop Tops',
        seller: 'San',
        condition: 'New',
        price: '45.99',
        details: 'lorem blah blah',
        image: '../images/item-4.jpg',
        active: 'true'
    },
    {
        id: '5',
        title: 'Daisy Bag',
        seller: 'Kiki',
        condition: 'Used',
        price: '30.99',
        details: 'lorem blah blah',
        image: '../images/item-5.jpg',
        active: 'true'
    },
    {
        id: '6',
        title: 'Link Plushie',
        seller: 'Midna',
        condition: 'New',
        price: '40.00',
        details: 'lorem blah blah',
        image: '../images/item-6.jpg',
        active: 'true'
    }
];

exports.find = () => items;

exports.findById = id => items.find(item => item.id === id);

exports.save = function(item){
    item.id = uuidv4();
    items.push(item);
    //FUNCTION NOT COMPLETE
};

exports.deleteById = function(id){
    let index = items.findIndex(item => item.id === id);
    if(index != -1){
        items.splice(index, 1);
        return true;
    }else{
        return false;
    }
}
