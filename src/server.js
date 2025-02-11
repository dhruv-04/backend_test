const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//import routes
const adminRoutes = require('./routes/adminRoutes');
const guestRoutes = require('./routes/guestRoutes');

//endpoint to view the homepage

//endpoint to login page

//route to correct path (add middleware authentication)
app.use('/admin', adminRoutes);
app.use('/guest', guestRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at http:/localhost/${PORT}`);
});