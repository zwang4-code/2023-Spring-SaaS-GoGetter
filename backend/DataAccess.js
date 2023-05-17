"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataAccess = void 0;
const Mongoose = require("mongoose");
class DataAccess {
    //static DB_CONNECTION_STRING:string = 'mongodb+srv://Cluster96542:W15dQ3hlY1N2@cluster96542.kaymygv.mongodb.net/gogetter';
    constructor() {
        DataAccess.connect();
    }
    static connect() {
        if (this.mongooseInstance)
            return this.mongooseInstance;
        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.on("open", () => {
            console.log("Connected to mongodb.");
        });
        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    }
}
exports.DataAccess = DataAccess;
DataAccess.DB_CONNECTION_STRING = 'mongodb://dbAdmin:test@localhost:27017/gogetter?authSource=admin';
DataAccess.connect();
console.log(DataAccess.mongooseConnection.readyState);
