
const {sequelize} = require('./models')
const onConnect =async ()=>{
  
      await sequelize.sync()
      
   
}

onConnect()