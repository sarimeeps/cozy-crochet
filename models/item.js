const {v4: uuidv4} = require('uuid');

const items = [
    {
        id: '1',
        title: 'Cat Bus Hat',
        seller: 'Mai',
        condition: 'Good',
        price: '20.99',
        details: ' Inspired by the beloved magical creature from "My Neighbor Totoro," this handmade hat captures the playful and cozy essence of the iconic Cat Bus. Crafted with soft, high-quality yarn, the hat features intricate details including the characteristic grinning face, bright yellow eyes, and little cat ears that bring the Cat Bus to life. Perfect for fans of all ages, this unique accessory adds a touch of charm and warmth to any outfit, making it an ideal gift for Ghibli enthusiasts or a delightful addition to your own collection.',
        image: '../images/item-1.jpg',
        active: 'true'
    },
    {
        id: '2',
        title: 'Ghibli Top & Cardigan',
        seller: 'Totoro',
        condition: 'New',
        price: '65.99',
        details: "Stay cozy and stylish with this Ghibli-inspired Totoro sweater, featuring a minimalistic design with subtle nods to the beloved forest spirit. Crafted from soft, high-quality yarn, this sweater offers a comfortable fit perfect for everyday wear. The understated design incorporates delicate Totoro-themed accents, such as small embroidered leaves and a discreet Totoro silhouette, adding a touch of whimsy without overwhelming the look. Ideal for fans who appreciate subtlety and elegance, this Totoro sweater seamlessly blends the magic of Studio Ghibli with contemporary fashion. Perfect for layering or wearing on its own, it's a versatile piece that adds a hint of enchantment to any outfit.",
        image: '../images/item-2.jpg',
        active: 'true'
    },
    {
        id: '3',
        title: 'Floral Trio Keychain',
        seller: 'Sophie',
        condition: 'Other',
        price: '15.00',
        details: 'Brighten up your everyday accessories with these adorable small crocheted floral keychains, available in three charming designs! Each keychain is meticulously handcrafted with soft, vibrant yarn, capturing the delicate beauty of flowers in a portable form. These keychains are perfect for adding a touch of whimsy and color to your keys, bags, or even as a cute gift for friends and loved ones.',
        image: '../images/item-3.jpg',
        active: 'true'
    },
    {
        id: '4',
        title: 'Crop Tops',
        seller: 'San',
        condition: 'New',
        price: '45.99',
        details: 'Embrace the boho-chic vibe with these stunning crocheted crop tops, available in three vibrant colors! Handcrafted with precision and care, these tops are perfect for adding a touch of handmade charm to your summer wardrobe. Each top is made from soft, breathable yarn, ensuring comfort and style in warm weather. The intricate crochet patterns provide a unique and elegant texture, making these tops a standout addition to any outfit.',
        image: '../images/item-4.jpg',
        active: 'true'
    },
    {
        id: '5',
        title: 'Daisy Bag',
        seller: 'Kiki',
        condition: 'Used',
        price: '30.99',
        details: 'The bag is made from durable, soft yarn, ensuring both style and practicality. Its spacious interior provides ample room for your essentials, while the sturdy handles offer comfortable carrying. Perfect for a day out, a picnic, or a casual stroll, this daisy bag is as functional as it is beautiful. The cheerful daisies and vibrant colors make it a standout accessory that brightens up any outfit. Ideal for nature lovers, flower enthusiasts, or anyone looking to add a whimsical touch to their collection, this crocheted daisy bag is a delightful fusion of fashion and nature.',
        image: '../images/item-5.jpg',
        active: 'true'
    },
    {
        id: '6',
        title: 'Link Plushie',
        seller: 'Midna',
        condition: 'New',
        price: '40.00',
        details: "The Hero of Hyrule himself in the plushie flesh! Made with high-quality, soft yarn and stuffed for the perfect huggable feel, this plushie is a delightful addition to any collecton. Whether you're a long-time fan of the series or just looking for a charming and unique gift, this Link plushie is sure to inspire heroic deeds and warm hearts wherever he goes.",
        image: '../images/item-6.jpg',
        active: 'true'
    }
];

exports.find = () => items;

exports.findById = id => items.find(item => item.id === id);

exports.save = function(item){
    item.id = uuidv4();
    items.push(item);
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

exports.updateById = function(id, newItem){
    let item = items.find(item => item.id === id);
    if(item){
        item.title = newItem.title;
        item.details = newItem.details;
        item.condition = newItem.condition;
        item.price = newItem.price;
        if(newItem.image){
            item.image = newItem.image;
        }
        console.log("condition:", newItem.condition);
        return true;
    }else{
        return false
    } 
}
