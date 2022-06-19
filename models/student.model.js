'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    
    static associate(models) {   
         this.belongsTo(models.Class,{
           foreignKey :{
             allowNull:false,
           }
         })
      
    }
  };
  Student.init({
    firstName: DataTypes.STRING(15),
    lastName:DataTypes.STRING(20),
    age:DataTypes.INTEGER(20),
    phoneNum:  DataTypes.INTEGER(10),
    gender:{type: DataTypes.STRING(10),defaultValue:'male'}
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};