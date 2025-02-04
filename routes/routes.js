const express =require('express');

const multer = require("multer");
const fs = require("fs");
const Order = require('../models/order.js');
//const signup  = require('../controllers/auth.js');
//const login  = require('../controllers/auth.js');
//const isAuth  = require('../controllers/auth.js');
const {fetchBlogs,createOrder,generateAiImage,deleteOrdersTable,deleteUserByEmail,createBlogPost,editBlogPost,image} = require('../controllers/auth');
 

const router = express.Router();
//function(req, res){


const storage = multer.diskStorage({
destination: function(req, file, cb) {
let dir = "./uploads"; // specify the path you want to store file
//check if file path exists or create the directory
fs.access(dir, function(error) {
if (error) {
console.log("Directory does not exist.");
return fs.mkdir(dir, error => cb(error, dir));
} else {
console.log("Directory exists.");
return cb(null, dir);
}
});
},
filename: function(req, file, cb) {
cb(null, Date.now() + "-" + file.originalname);
console.log('checking orig filename'+file.originalname); // added Date.now() so that name will be unique
}
});


const uploadFiles = multer({ storage: storage });


/*
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
})
*/



/*
router.post("/fileupload", uploadFiles.single("file"), (req, res, next) => {
const file = req.file;

if (!file) {
const error = new Error("Please upload a file");
error.httpStatusCode = 400;
return next(error);
}

 AppUser.update(
    {   resumefile:file.filename
     }, 

    {
    where: {
    id: req.body.uid   
  }
}).then(() => {
        
    
//      return res.status(200).json({message: "User Details Updated"});

res.json({
success: true,
statusCode: 200,
fileName: file.filename });

})


});
*/



router.post('/generateAiImage', function(req, res,next){
 generateAiImage(req,res,next);
});

router.post('/fetchBlogs', function(req, res,next){
 fetchBlogs(req,res,next);
});

router.post('/deleteUserByEmail', function(req, res,next){
 deleteUserByEmail(req,res,next);
});


router.post('/createBlogPost', function(req, res,next){
 createBlogPost(req,res,next);
});


router.post('/deleteOrdersTable', function(req, res,next){
 deleteOrdersTable(req,res,next);
});


router.post('/createOrder', function(req, res,next){
 createOrder(req,res,next);
});

router.post('/editBlogPost', function(req, res,next){
 editBlogPost(req,res,next);
});


router.post('/image', uploadFiles.single("file"), function (req, res,next) {

const file = req.file;

  console.log('reached');
res.json({
success: true,
statusCode: 200,
fileName: file.filename });


  //res.json({});
});


// will match any other path
router.use('/', (req, res, next) => {
    res.status(200).json({error : "page not found"});
});

//export default router;
module.exports = router;
