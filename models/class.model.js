'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    
    static associate(models) {
      this.hasMany(models.Student,{
       onUpdate:"cascade",
       onDelete:"restrict"
      })
    
  };
}
  Class.init({
    class_name: DataTypes.STRING(100),
    class_teacher_name: DataTypes.STRING(50),
    student_count: DataTypes.INTEGER(30),
    class_level: DataTypes.INTEGER(11)
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};