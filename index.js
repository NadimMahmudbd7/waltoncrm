const express = require('express');
const app = express()
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8qbqp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log("db conntected");


async function run() {
    try {
        await client.connect()
        const AllBlogs = client.db("Chapai").collection("Posts")
        app.get("/blogs", async(req, res) => {
            const query = {}
            const cursor = AllBlogs.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        app.post("/blogs", async(req,res)=>{
            const newBlog = req.body
            const result = await AllBlogs.insertOne(newBlog)
            console.log("add",result);
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(console.dir)



app.get("/", (req, res) => {
    res.send("this is working")
})

app.listen(port, () => {
    console.log("Listening port:", port)
})