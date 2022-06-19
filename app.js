const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {Class,Student} = require('./models')
const bcrypt = require('bcryptjs')
const {one,two, three} = require('./models/sth')

app.set("view engine" ,"ejs")
app.use(bodyParser.urlencoded({extended:false}))

app.get('/student',(req,res)=>{
    res.render('login')
})

app.get('/class',(req,res)=>{
    res.render('login2')
})
app.get('/actormovies',async(req,res)=>{
   
    res.render('actormovies')
})
app.get('/detect',(req,res)=>{
   res.render('detect')
})
app.post('/class',async(req,res)=>{
    Object.keys(req.body).forEach(elem=>{if(req.body[elem]=='') req.body[elem]=undefined })
    
   await Class.create(req.body)
   .then(result=>{
       console.log(result)
   })
   .catch(err=> console.log(err))
   res.redirect('/student')
})

app.post('/student',async(req,res)=>{
    
  Object.keys(req.body).forEach(elem=>{if(req.body[elem]=='') req.body[elem]=undefined })
 
   await Student.create(req.body)
   .then(result=>{
       console.log(result)

   })
   .catch(err=> console.log(err))
   res.redirect('/success')
})

app.get('/success',(req,res)=>{
    res.send('Success')
})

 app.get('/find',async(req,res)=>{
   const row =await Student.findAll({
       include:{
            model: Class,
             where:{
                 state:Sequelize.col('class_name')
             }
        }
     })
     res.send(row)
 })

app.post('/actormovies',async(req,res)=>{
    const {movie,actor}= req.body
    Object.keys(req.body).forEach(elem=>{if(req.body[elem]=='') req.body[elem]=undefined })
    
    await one.create({
        name:movie
    })
    .then(result=>{
    })
    .catch(err=> console.log(err))
    await two.create({name:actor})
    .then(result=>{

    })
    
    .catch(err=> console.log(err))
   res.redirect('/success')
 
})

app.post('/detect',async(req,res)=>{
    const {movie_name,actor_name} =req.body
    Object.keys(req.body).forEach(elem=>{if(req.body[elem]=='') req.body[elem]=undefined })
    const [actorid] =await two.findAll({
        where: {name: actor_name}
      });
      const [movieid] =await one.findAll({
        where: {name: movie_name}
      });
    await three.create({MovieId:movieid['id'],ActorId:actorid['id']})
    .then(result=>{
       
    })
    .catch(err=> console.log())
    res.redirect('/success')
})

app.listen(4000)

