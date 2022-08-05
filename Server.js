const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const mongoose = require('mongoose')
const Alp = require('./alpha')


const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const url = 'mongodb+srv://hi:hello@cluster0.do0npib.mongodb.net/test?retryWrites=true&w=majority'

const client = new MongoClient(url, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        await client.connect();
        const alphabetCollection = client.db("test").collection("alphabets");

        app.post("/alphabets", async (req, res) => {
            const alphabet = req.body;
            const result = await alphabetCollection.insertOne(alphabet);
            res.send(result);
        });

        app.get("/alphabets", async (req, res) => {
            const alphabets = await alphabetCollection.find().toArray();
            res.send(alphabets);
        });

        app.get("/alphabets/:id", async (req, res) => {
            const alphabetId = req.params?.id;
            try {
                const query = { _id: alphabetId };
                const alphabet = await alphabetCollection.findOne(query);
                res.send(alphabet);
            } catch (error) {
                res.status(400).send({
                    success: false,
                    message: "Invalid alphabet Id",
                });
            }
        });
    } finally {}
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Hello from  Equation calc drag drop server");
});

app.listen(port, () => {
    console.log("Listening to port", port);
});
