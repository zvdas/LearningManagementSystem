// import necessary modules
const express = require('express');
const dotenv = require('dotenv');

// load environment variables
dotenv.config({ path: './config/config.env' });

// define express app
const app = express();

//define port
const PORT = process.env.PORT || 5000;

// start express app
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`)
});