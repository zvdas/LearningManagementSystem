// import necessary libraries
const multer = require('multer');

// configure multer - filenames
exports.storage = multer.diskStorage({
    filename: function(req, file, cb) {
        cb(null, file.originalname+Date.now())
    }
})

// export the multer configuration
exports.upload = multer({ storage: this.storage });