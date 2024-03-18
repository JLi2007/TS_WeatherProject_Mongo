import {MongoClient} from 'mongodb';

const url:any = process.env.MONGO_KEY;
const client = new MongoClient(url);

async function connectToMongo(){
    try{
        await client.connect();
        console.log("Connected to database")
    }catch(e){
        console.error("Error connecting to mongo", e);
        throw e;
    }
}

async function closeMongo(){
    try{
        await client.close();
        console.log("Closed database");
    }catch(e){
        console.error("Error closing connection", e);
        throw e;
    }
}

async function insertData(data:any){
    try{
        const database = client.db("weatherDatabase");
        let collectionName = ""
        if (data.weather){
            collectionName = "weatherCollection"
        }else{
            collectionName = "locationCollection"
        } 
    
        if (collectionName){
            const collection = database.collection(collectionName);
            await collection.insertOne(data);
            console.log("Inserted data into MONGODB");
        }else{
            console.log("Insert did not work")
        }
    }catch(e){
        console.error("Error inserting into Mongo", e);
        throw e;
    }
}

export{connectToMongo, closeMongo,insertData}