require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const router = require('./Routes/router');
require("./db/database");





// Allow requests from Netlify frontend
const corsOptions = {
    origin: "https://areebahmed-portfolio.netlify.app/", // Replace with your actual Netlify domain
    credentials: true,
};

app.use(cors(corsOptions)); // Use the specific CORS configuration
app.use(express.json());
app.use(router)





app.listen(PORT, () => {
    console.log('Server started', PORT);
})

module.exports = app;