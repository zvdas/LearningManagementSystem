// import necessary modules
const mongoose = require('mongoose');

// configure mongodb connection 
const connectDB = async() => {
    const conn = await mongoose.connect(
        process.env.MONGODB_URI,
        {
            // newUrlParser: true,
            useUnifiedTopology: true
        }
    );

    console.log(`MongoDB connected : ${conn.connection.host}`);
}

// export mongodb configuration
module.exports = connectDB;