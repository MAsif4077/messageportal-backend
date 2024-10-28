// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

const clientRoutes = require('./routes/clientRoutes');
const rateCardRoutes = require('./routes/rateCardRoutes');
const messageLogRoutes = require('./routes/messageLogRoutes');
const numberRoutes = require('./routes/numberRoutes'); 

app.use('/api/v1/clients', clientRoutes);
app.use('/api/v1/rateCards', rateCardRoutes);
app.use('/api/v1/messageLogs', messageLogRoutes);
app.use('/api/v1/numbers', numberRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
