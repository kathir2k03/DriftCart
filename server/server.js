const app = require('./app')
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')

dotenv.config({path:"config/config.env"})

connectDatabase()

app.listen(process.env.PORT,() =>{
    console.log(`Server is istening to the port : ${process.env.PORT}`)
})

// to run the server => nodemon server || npm start