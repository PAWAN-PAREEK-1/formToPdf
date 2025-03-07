const mongoose = require('mongoose')

const connect = async ()=>{
try {
   
    const connection = await mongoose.connect(process.env.DB)
    console.log("database connection successful"+ connection.connection.name)

} catch (error) {
    console.log(error)
    process.exit(1)
}
}

module.exports = connect;