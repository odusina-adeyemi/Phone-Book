const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const cors = require('cors');



const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



// Disk Storage with multer 


//  const storage = multer.diskStorage({
//     destination: (req, file, cb, ) =>{
//         cb(null, '/')
//     },

//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
     
// });

//  const upload = multer({storage: storage})

// module.exports = {upload}






// Memory Storage with multer 

// const storage = multer.memoryStorage()

// const upload = multer({storage})

// module.exports = {upload}




const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = { upload };
