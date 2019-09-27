const {MongoClient, ObjectId} = require('mongodb');

const MONGO_URI = 'AQUI_TU_URI_MONGO_ATLAS';

class MongoLib {
    constructor(){
        this.client = new MongoClient(MONGO_URI, {useNewUrlParser : true});
        this.dbName = 'db_products';
    }

    connect(){
        if(!MongoLib.connection){
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if(err){
                        reject(err)
                    }

                    resolve(this.client.db(this.dbName));
                })
            })
        }

        return MongoLib.connection;
    }

    getAll(collection, query){
        return this.connect().then(db => {
            return db
            .collection(collection)
            .find(query)
            .toArray();
        })
    }
}

module.exports = MongoLib;