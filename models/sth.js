 'use strict';

const {Sequelize,DataTypes} = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


  const Movie = sequelize.define('Movie', { name: DataTypes.STRING });
  const Actor = sequelize.define('Actor', { name: DataTypes.STRING });
  const ActorMovies = sequelize.define('ActorMovies', {
    MovieId: {
      type: DataTypes.INTEGER,
      references: {
        model: Movie, // 'Movies' would also work
        key: 'id'
      }
    },
    ActorId: {
      type: DataTypes.INTEGER,
      references: {
        model: Actor, // 'Actors' would also work
        key: 'id'
      }
    }
  });
  Movie.belongsToMany(Actor, { through: ActorMovies });
  Actor.belongsToMany(Movie, { through: ActorMovies });

  const db={
     one: Movie,
     two: Actor,
     three : ActorMovies}
     
  const onConnect = ()=>{
      Object.keys(db).forEach(elem=> {
       (async()=>{
           await db[elem].sync({force:false});
            //console.log(db[elem])
       })();
  })
  }

  onConnect()

  db.sequelize = sequelize
  module.exports=db
 
