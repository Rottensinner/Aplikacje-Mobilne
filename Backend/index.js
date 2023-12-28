const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors'); // Dodane: Import pakietu cors

const app = express();
const productRouter = require('./routes/product');
const port = 3000;

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Połączenie z bazą danych udane!"))
  .catch((err) => console.log(err));

app.use(cors()); // Dodane: Dodanie obsługi CORS

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/products', productRouter);

app.listen(process.env.PORT || port, () =>
  console.log(`Aplikacja działa na porcie ${process.env.PORT || port}!`)
);
