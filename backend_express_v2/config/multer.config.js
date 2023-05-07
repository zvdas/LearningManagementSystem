// import necessary libraries
const multer = require('multer');

// configure multer - filenames
/*
exports.storage = multer.diskStorage({
    filename: function(req, file, cb) {
        cb(null, file.originalname.split('.')[0]+'_'+Date.now()+'.'+file.originalname.split('.')[1])
    }
})
*/

// export the multer configuration
// exports.upload = multer({ storage: this.storage });
exports.upload = multer();