const express = require('express');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const user_routes = require('./routes/user.routes');
const products_routes = require('./routes/user.routes.js');
const cookieParser = require('cookie-parser');
const errorMiddleware = require("./middleware/Error.js")


const app = express();
const PORT = process.env.PORT||5000;


app.use(express.json());
app.use(cookieParser());
app.use(cors());
dotenv.config();
connectDB();



// Mock data
app.use("/api/user",user_routes);
app.use("/api/product",products_routes);


// middle ware for error
app.use(errorMiddleware)


app.listen(process.env.PORT, () => console.log('Server running on port 5000'));