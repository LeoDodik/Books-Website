import express, { response } from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';
import axios from 'axios';
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
      const response = await axios.get("https://covers.openlibrary.org/b/id/240727-S.jpg");
      console.log("Full API Response:", response.data); // Log the entire API response
      const imageUrl = response.data && response.data.url;
      console.log("Image URL:", imageUrl); // Log the image URL

      res.render("index.ejs", { imageUrl });
  } catch (error) {
      console.error("Error fetching book cover:", error);
      res.render("error.ejs", { error: "Error fetching book cover" });
  }
});



 
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
