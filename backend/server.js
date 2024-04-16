const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser');

const cors = require('cors');
const route = require('./routes/index')

require('dotenv').config()

const {errorHandler, notFound} = require('./app/middleware/errorMiddleware');

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(morgan('combined'))
// app.use(errorHandler);
// app.use(notFound);

const db = require('./config/database');
db.connect();

route(app);

app.get('/', (req, res) => {
    console.log(req.query)
    res.status(200).json({
        status: 'success',
        message: 'Hello from Server'
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})