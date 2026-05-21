const app = require('./app')
const connectDatabase = require('./config/database')



connectDatabase()

app.listen(process.env.PORT,() =>{
    console.log(`Server is istening to the port : ${process.env.PORT}`)
})

// to run the server => nodemon server || npm start || npm run seed

// & "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe"