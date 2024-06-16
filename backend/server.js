const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const otpRoutes = require('./app/routes/otpRoutes');
const signRoutes = require('./app/routes/signRoutes')

const app = express();
app.use(cors());
dotenv.config();

app.use(express.json());

const db = require('./db/index');
db.connectDB()


app.get('/', (req, res) => {
    res.send('Server is ready');
})

app.use('/otp', otpRoutes);
app.use('/sign', signRoutes);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
