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
    const rentCollection = client.db('RentDB').collection('rents');

    app.post('/rents', async(req, res) => {
        const taskitem = req.body;
        const result = await rentCollection.insertOne(taskitem);
        res.send(result);
      })
    app.get('/rents', async (req, res) => {
        const result = await rentCollection.find().toArray();
        res.send(result);
      });
    app.get('/userrents', async (req, res) => {
        try {
            console.log(req.query.email);
            let query = {};
            if (req.query?.email) {
                console.log(req.query?.email)
                query = { email: req.query.email };
            }
            const result = await rentCollection.find(query).toArray();
            console.log(result)
            res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    });
    app.delete('/userrents/:id', async(req, res)=>{
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await rentCollection.deleteOne(query);
        res.send(result);
      })
    app.get('/userrents/:id', async(req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id)};
        const result = await rentCollection.findOne(query);
        res.send(result);
      })
      app.put('/userrents/:id', async(req, res) => {
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)};
        const options = { upsert: true };
        const updatedItem = req.body;
        const item ={
          $set: {
            name: updatedItem.name,
            address: updatedItem.address,
            city: updatedItem.city,
            bedroom: updatedItem.bedroom,
            bathroom: updatedItem.bathroom,
            size: updatedItem.size,
            rent: updatedItem.rent,
            phn: updatedItem.phn,
           date: updatedItem.date,
           notes: updatedItem.notes,
           image: updatedItem.image,
          }
        };
        const result = await rentCollection.updateOne(filter, item, options);
        res.send(result);
      })

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