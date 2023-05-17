import Mongoose = require("mongoose");

class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;
    static DB_CONNECTION_STRING:string = 'mongodb://dbAdmin:test@localhost:27017/gogetter?authSource=admin';
    //static DB_CONNECTION_STRING:string = 'mongodb+srv://Cluster96542:W15dQ3hlY1N2@cluster96542.kaymygv.mongodb.net/gogetter';
    
    constructor () {
        DataAccess.connect();
    }
    
    static connect (): Mongoose.Connection {
        if(this.mongooseInstance) return this.mongooseInstance;
        
        this.mongooseConnection  = Mongoose.connection;
        this.mongooseConnection.on("open", () => {
            console.log("Connected to mongodb.");
        });
        
        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    }
    
}
DataAccess.connect();
console.log(DataAccess.mongooseConnection.readyState);
export {DataAccess};