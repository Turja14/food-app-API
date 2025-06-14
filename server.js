const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
connectDB(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/test', require('./routes/test_routes'));
app.use('/api/v1/auth', require('./routes/auth_routes'));
app.use('/api/v1/user', require('./routes/user_routes'));
app.use('/api/v1/restaurant', require('./routes/res_routes'));
app.use('/api/v1/category', require('./routes/cate_routes'));
app.use('/api/v1/food', require('./routes/food_routes'));




app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
