const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('neondb', 'sanjeev.dasgupta', 'O2iAgXxL6dcu', {
    dialect: 'postgres',
    dialectOptions: {
    ssl: {
        rejectUnauthorized: false
    }
},
    host: 'ep-solitary-meadow-593229.ap-southeast-1.aws.neon.tech'
    
});

//export default sequelize;
module.exports = sequelize;

