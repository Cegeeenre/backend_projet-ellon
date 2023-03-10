import express from 'express';
import cors from 'cors';

const app = express();

// Prix pour 100km = 3€
const prixKM = 3;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/price/:distance', (req, res) => {
  const price = (parseInt(req.params.distance) * prixKM) / 100;
  res.send(price.toString());
});

app.listen(5001, () => {
  console.log('Price calculator listening on port 5001');
});

export default app;