"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertData = exports.closeMongo = exports.connectToMongo = void 0;
const mongodb_1 = require("mongodb");
const url = process.env.MONGO_KEY;
const client = new mongodb_1.MongoClient(url);
function connectToMongo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Connected to database");
        }
        catch (e) {
            console.error("Error connecting to mongo", e);
            throw e;
        }
    });
}
exports.connectToMongo = connectToMongo;
function closeMongo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.close();
            console.log("Closed database");
        }
        catch (e) {
            console.error("Error closing connection", e);
            throw e;
        }
    });
}
exports.closeMongo = closeMongo;
function insertData(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const database = client.db("weatherDatabase");
            let collectionName = "";
            if (data.weather) {
                collectionName = "weatherCollection";
            }
            else {
                collectionName = "locationCollection";
            }
            if (collectionName) {
                const collection = database.collection(collectionName);
                yield collection.insertOne(data);
                console.log("Inserted data into MONGODB");
                const query = { name: "Windsor" };
                const location = "Milan";
                //    const location = await findDocuments(collection,query);
                const update = yield updateDocuments(collection, location);
                //    const deletion = await deleteDocuments(collection, location)
                //    console.log("${query}:", location)
                console.log(`${location}:`, JSON.stringify(update));
                //    console.log(`all instances of ${location} deleted`, deletion)
            }
            else {
                console.log("Insert did not work");
            }
        }
        catch (e) {
            console.error("Error inserting into Mongo", e);
            throw e;
        }
    });
}
exports.insertData = insertData;
//Some practice functions that I wanted to try
function findDocuments(collection, query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield collection.find(query).toArray();
            return result;
        }
        catch (e) {
            console.error("Error finding documents:", e);
            throw e;
        }
    });
}
function updateDocuments(collection, location) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield collection.updateMany({ name: location }, {
                $set: {
                    lat: `00000 ${location}`
                }
            });
            return result;
        }
        catch (e) {
            console.error("error in update", e);
        }
    });
}
function deleteDocuments(collection, query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield collection.deleteMany({ name: { $regex: query } });
            return result;
        }
        catch (e) {
            console.error("error in deletion", e);
        }
    });
}
