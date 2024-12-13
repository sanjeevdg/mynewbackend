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
                        details: '' 
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
