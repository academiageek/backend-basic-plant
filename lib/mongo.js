const {MongoClient, ObjectId} = require('mongodb');

const MONGO_URI = 'mongodb+srv://db_user_poli:poli123@clusterpoli-hfsdy.mongodb.net/db_products?retryWrites=true&w=majority';

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