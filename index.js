import express from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'collection',
  password: 'krmak123',
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
  try {
    const result = await db.query("SELECT read_date FROM books WHERE id = 1;");
    const readingDate = result.rows;
    const result2 = await db.query("SELECT rating FROM books WHERE id = 1;")
    const rating = result2.rows
    res.render("index.ejs", { readingDate, rating});
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    res.status(500).send('Internal Server Error');
  }
  
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
