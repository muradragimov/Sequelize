const {Class,Student,sequelize } = require('./models');
const {three, two, one} = require('./models/sth');
const { Op, Sequelize, where } = require("sequelize");

const init =async()=>{
    const query =await one.findAll({
           
       attributes:{
         exclude:['id']
       }
      //group:sequelize.col('MovieId')
     
    })
    console.log(query)
}
init()