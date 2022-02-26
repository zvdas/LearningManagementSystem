const database = require('../configurations/mongodb-config');

exports.add = (image,callback) => {
    const imageCollection = database.getImageCollection();
    imageCollection.insertOne({ imageString: image.imageString })
};

exports.getAll = (callback) => {
    const imageCollection = database.getImageCollection();
    imageCollection.find().toArray()
        .then((images) => {
            return callback(images);
        });
};