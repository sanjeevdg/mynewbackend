const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../utils/database.js');
const Order = require('../models/order.js');

const fs = require("fs");
const axios = require('axios');
const FormData = require('form-data');

const admin = require('firebase-admin');

//const admin = require("firebase-admin");
//var formidable = require('formidable');
//const serviceAccount = require("../firebase.json");

// serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
//console.log(JSON.stringify(serviceAccount));
/*
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const tokens = [];


"type": "service_account","project_id": "yetanotherapp-c08f3","private_key_id": "ffd07f74cea27cef65cd63940ac8ca65e99ab2ed",  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDSQ5WSPWIkZSZw\nTQDM7vGuI3gWtQY1jRoZvokXJjeP8aR7fEQxH43g7yg4557Q0u3UxUmIDuY+QNCo\n5LyIPK61rGSX1KsqhZP2tuHrZfFIPcjHFV2EnAbCkgDpH5jtt5SiKT6P3b7PX6zu\nXCKM9BHc+gvarp8Qg4UoL1sERFJS1gQhsqfspVkuw9MnfBmGXZaG80Mssa8yGfYs\nh+eDBmePJ9o0jphdo6ptj49qnugJ9V3PkRau5B5qzoPkHjr+5JWXIq5r2aYDL7xb\nXzjETM9uaHuwV86nJMcr1lBg44fMsTOq/vIQmtCCCvZh48CpfaaT3I70lCk5h6iI\no+XGbFTPAgMBAAECggEAH6TtPeuVZCMsTvVqe+0wG+7u9AKS0ydlDgp8vlT8QrfG\nyJDcqxnzyS5Put9c/vznr0BxKb64TGvbxgywCmmQ5PrzeV2X1G1IZfaDIgwfF9S4\nmAGxUokFhBiOINz7r+G+RvjMbMFzez6Lxk8Wd2kvcQwuvDQl8J8ilfgpNgdZmRP3\nk9xm8Ttx0RZ8fLXwbI/b9xkG6Plr5TCX6qbcLdaIE3W5XfdFe7t/hSc+/JEJU/U5\nhdp5AJouSYXkg35LQOxdA+YRHT/2fdsjB1KLt3whglluSQWo7gHSfLaV67JwlWSa\nOU57U9uw0kRH+ZUt8H8NSxd4Q4WWpBx807GAWsygFQKBgQD2LkOGt/2IbXnXDEag\nqJ0O0Za8ott8akUv+MYwaN0//Tn3BP/E6VGBN5Ga0Mq/M2I42zsGSk5H9Swo+5bC\nVoqiNbS/LnU2HIqCdfyMcrS7tgp9tHqDx2vmink42EvclqG2LzcKywxB+HtX/HPd\nGbIrrSL7s1rlt2Ch0iXB0ujI0wKBgQDappO8ZHNXbUTFKsZ1XLwQq6rZbjUep1/g\ny6bs3hLM/tRLu4awvCTGstIb+JhA4ablj6/BfL/GhacLG5ry1ftYhEWn96c1iW7L\n/6eKLr2ADIG1Di+UiN2I8bpBJTNo5DXe1/oVjufYtI6w6P23SC9PHq6EivHJopfR\n/SoXkkuGlQKBgGrWpSOgUf2VVV1IzJYI1zCJMRvoqcyS6jfphUmZGPweT7uuhbnV\ncDPeA+jmWDcme6glLLaMJPEBrAqVNVZd7Ih9OlYGOYQkWtBHmDTzyw/z7xWi79Cl\nCWTiD73l0PaIwOGqF/8tI8K1rgH/Y+E+t55Q42/M5NPxA5T2+L/nYnNVAoGAev/I\nDeuoIt9aF1xHxg/Dz9DyTFw9z5+yRN/raEZI5z7XKD82tscwHQLNRWTkKWOHIo5g\n/YRy0XewD4SY9tA/E31dPe8IBgro5CNOGWLPwW/Hq5VuWK1hij8JWspVkEUItPJk\nQaphbDuuJYD78RXPXz/QRslu2NH5e+xhuF7Y070CgYAfsrA1wE2MUzqoIn7JTnwZ\nufifi573+uQ5klXBGV7Sa/lEu6otkcV1IfamNQquKYwFYaGtm7YjZpGgpWipcf0g\nmB2ZzsRIez6oSKxJB4wsD9Vfxq69yQkAAIjmnVHCiZ9dWrlhRpPXplfwTXWLK7pj\n5dXy5UNFuPXZDtGm3iGC7A==\n-----END PRIVATE KEY-----\n",  "client_email": "firebase-adminsdk-40s0n@yetanotherapp-c08f3.iam.gserviceaccount.com",  "client_id": "109439515790696392614",  "auth_uri": "https://accounts.google.com/o/oauth2/auth",  "token_uri": "https://oauth2.googleapis.com/token",  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-40s0n%40yetanotherapp-c08f3.iam.gserviceaccount.com",  "universe_domain": "googleapis.com"




*/

const generateAiImage = async (req,res,next) => {




const payload = {
  prompt: "Lighthouse on a cliff overlooking the ocean",
  output_format: "webp"
};

const response = await axios.postForm(
  `https://api.stability.ai/v2beta/stable-image/generate/ultra`,
  axios.toFormData(payload, new FormData()),
  {
    validateStatus: undefined,
    responseType: "arraybuffer",
    headers: { 
      Authorization: `Bearer sk-AR4GVhPd7PlceuTDqlG32owykP4b72mfyS5ckqKdeu02gD8O`, 
      Accept: "image/*" 
    },
  },
);

if(response.status === 200) {
  fs.writeFileSync("../uploads/lighthouse.webp", Buffer.from(response.data));
} else {
  throw new Error(`${response.status}: ${response.data.toString()}`);
}


}

const delete_user = (uid) => {

admin.auth()
  .deleteUser(uid)
  .then(() => {
    console.log('Successfully deleted user');
  })
  .catch((error) => {
    console.log('Error deleting user:', error);
  });


};

const deleteUserByEmail = async (req,res,next) => {

let em = req.body.email;

admin.auth()
  .getUserByEmail(em)
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log(`Successfully fetched user data:` + JSON.stringify(userRecord));

    delete_user(userRecord.uid)
    //res.send('ok'//,e{})
    res.status(200).json({ message: JSON.stringify(userRecord) });
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
  });

};


const deleteOrdersTable = async (req,res,next) => {

var query = "drop table orders";
console.log('uery is'+query);
const [results, metadata] = await sequelize.query(query);

//if (results) {
res.status(200).json({"message":"orders table drop success."})

//}

};





const createOrder = async (req, res, next) => {
  
                       Order.create(({                        
                        name: 'test',
                      mobile: '8617784642',
                        details: 'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDSQ5WSPWIkZSZwTQDM7vGuI3gWtQY1jRoZvokXJjeP8aR7fEQxH43g7yg4557Q0u3UxUmIDuY+QNCo5LyIPK61rGSX1KsqhZP2tuHrZfFIPcjHFV2EnAbCkgDpH5jtt5SiKT6P3b7PX6zuXCKM9BHc+gvarp8Qg4UoL1sERFJS1gQhsqfspVkuw9MnfBmGXZaG80Mssa8yGfYsh+eDBmePJ9o0jphdo6ptj49qnugJ9V3PkRau5B5qzoPkHjr+5JWXIq5r2aYDL7xbXzjETM9uaHuwV86nJMcr1lBg44fMsTOq/vIQmtCCCvZh48CpfaaT3I70lCk5h6iIo+XGbFTPAgMBAAECggEAH6TtPeuVZCMsTvVqe+0wG+7u9AKS0ydlDgp8vlT8QrfGyJDcqxnzyS5Put9c/vznr0BxKb64TGvbxgywCmmQ5PrzeV2X1G1IZfaDIgwfF9S4mAGxUokFhBiOINz7r+G+RvjMbMFzez6Lxk8Wd2kvcQwuvDQl8J8ilfgpNgdZmRP3k9xm8Ttx0RZ8fLXwbI/b9xkG6Plr5TCX6qbcLdaIE3W5XfdFe7t/hSc+/JEJU/U5hdp5AJouSYXkg35LQOxdA+YRHT/2fdsjB1KLt3whglluSQWo7gHSfLaV67JwlWSaOU57U9uw0kRH+ZUt8H8NSxd4Q4WWpBx807GAWsygFQKBgQD2LkOGt/2IbXnXDEagqJ0O0Za8ott8akUv+MYwaN0//Tn3BP/E6VGBN5Ga0Mq/M2I42zsGSk5H9Swo+5bCVoqiNbS/LnU2HIqCdfyMcrS7tgp9tHqDx2vmink42EvclqG2LzcKywxB+HtX/HPdGbIrrSL7s1rlt2Ch0iXB0ujI0wKBgQDappO8ZHNXbUTFKsZ1XLwQq6rZbjUep1/gy6bs3hLM/tRLu4awvCTGstIb+JhA4ablj6/BfL/GhacLG5ry1ftYhEWn96c1iW7L/6eKLr2ADIG1Di+UiN2I8bpBJTNo5DXe1/oVjufYtI6w6P23SC9PHq6EivHJopfR/SoXkkuGlQKBgGrWpSOgUf2VVV1IzJYI1zCJMRvoqcyS6jfphUmZGPweT7uuhbnVcDPeA+jmWDcme6glLLaMJPEBrAqVNVZd7Ih9OlYGOYQkWtBHmDTzyw/z7xWi79ClCWTiD73l0PaIwOGqF/8tI8K1rgH/Y+E+t55Q42/M5NPxA5T2+L/nYnNVAoGAev/IDeuoIt9aF1xHxg/Dz9DyTFw9z5+yRN/raEZI5z7XKD82tscwHQLNRWTkKWOHIo5g/YRy0XewD4SY9tA/E31dPe8IBgro5CNOGWLPwW/Hq5VuWK1hij8JWspVkEUItPJkQaphbDuuJYD78RXPXz/QRslu2NH5e+xhuF7Y070CgYAfsrA1wE2MUzqoIn7JTnwZufifi573+uQ5klXBGV7Sa/lEu6otkcV1IfamNQquKYwFYaGtm7YjZpGgpWipcf0gmB2ZzsRIez6oSKxJB4wsD9Vfxq69yQkAAIjmnVHCiZ9dWrlhRpPXplfwTXWLK7pj5dXy5UNFuPXZDtGm3iGC7A==' 
                    }))
                    .then(async() => {
                        res.status(200).json({message: "order created"});
                         // send the notification
                         /*
                      await admin.messaging().send({
      token: req.body.regtoken,
      notification: {
        title:"Received your Order",
        body:"Your order is being processed. Please view delivery status at...",
        imageUrl:'',
      },
    });   
                         */
                         
             console.log('message sent');            
                         
                    })
                    .catch(err => {
                        console.log('create_order error message is:::::'+err);
                        res.status(502).json({message: "error while creating the order"});
                    });
   
   
  res.status(200).json({ message: "Successfully created Order!" });
};


 
  


//export { signup, login, isAuth };
module.exports = {createOrder,generateAiImage,deleteOrdersTable,deleteUserByEmail} ;
