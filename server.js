const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URI = process.env.BASE_URI || '/api/v1';


app.use(cors());
app.use(express.json());


const apiRoutes = require('./src/routes/apiRoutes');
app.use(BASE_URI, apiRoutes);


app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "Endpoint not found",
    data: null
  });
});


app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}${BASE_URI}`);
});