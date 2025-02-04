const express = require("express");
const http = require("http");
const sequelize = require('./utils/database.js');
const fs = require("fs");




const router = require('./routes/routes.js');
const bodyParser = require("body-parser");
const app = express();

const Order = require('./models/order.js');
const admin = require('firebase-admin');

app.set('port', (process.env.PORT || 5000));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5MB' }))
app.use(bodyParser.raw());

app.use('/uploads', express.static(__dirname + '/uploads'));



app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
}); 


app.use(router);

//const server = http.createServer(app);
//Employer.hasMany(Job);
//Job.belongsTo(Employer);
sequelize.sync(); 

const fetch_pvt_key_frm_db = async() => {

var query = "select id,details from orders where id=1";
console.log('uery is'+query);
const [results, metadata] = await sequelize.query(query);

if (results) {
	console.log('XXXXX>>>>>',String(results[0].details));
	//fs.writeFileSync("./pkoutput.txt", results[0].details.replace(/\\n/g, '\n'));
//	console.log('YYYYY>>>>>',results[0].details.replace(/\\n/g, '\n'));
return results[0].details.replace(/\\n/g, '\n');
}

};


fetch_pvt_key_frm_db().then(res => { 

console.log('typeofres>>', typeof res );

admin.initializeApp({
  credential: admin.credential.cert({
  "type": "service_account",
  "project_id": "yetanotherapp-c08f3",
  "private_key_id": "ffd07f74cea27cef65cd63940ac8ca65e99ab2ed",
  "private_key": `${res}`,
  "client_email": "firebase-adminsdk-40s0n@yetanotherapp-c08f3.iam.gserviceaccount.com",
  "client_id": "109439515790696392614",
  "auth_uri":"https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-40s0n%40yetanotherapp-c08f3.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
})

});

// project

console.log('initilized!!');

	//console.log('res>>>>',res)



});

//console.log('ZZZZZZ>>>>>',sfetch_pvt_key_frm_db());

//process.stdout.write(fetch_pvt_key_frm_db());
//.split(String.raw`\n`).join("\n")
/*
*/

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
