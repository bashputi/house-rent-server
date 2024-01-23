const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fobkzbd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
serverApi: {
  version: ServerApiVersion.v1,
  strict: true,
  deprecationErrors: true,
}
});

async function run() {
try {




// await client.connect();
// await client.db("admin").command({ ping: 1 });
 console.log("Pinged your deployment. You successfully connected to MongoDB!"); 
} finally {
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('House Rent is runnig')
})
app.listen(port, () => {
    console.log(`House Rent is running on port ${port}`);
})