const images = [];

module.exports = class ImageModel {

    constructor(imageString,imageMimetype,id) {
        this.imageString = imageString;
        this.imageMimetype = imageMimetype;
        this._id = id;
    }
    
}