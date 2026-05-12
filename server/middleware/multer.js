const multer = require('multer')
const path = require('path')
const fs = require('fs')

if (!fs.existsSync('uploads/users')) {
    fs.mkdirSync('uploads/users', { recursive: true })
}

const storage = multer.diskStorage({

    destination: function(req, file, cb){
        cb(null, 'uploads/users')
    },

    filename: function(req, file, cb){

        const ext = path.extname(file.originalname)

        cb(null, Date.now() + ext)
    }

})

const fileFilter = (req, file, cb) => {

    if(file.mimetype.startsWith('image')){
        cb(null, true)
    } else {
        cb(new Error('Only images are allowed'), false)
    }

}

const upload = multer({
    storage,
    fileFilter
})

module.exports = upload