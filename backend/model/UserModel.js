"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const DataAccess_1 = require("../DataAccess");
const Mongoose = require("mongoose");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
let mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
class UserModel {
    constructor() {
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            userId: { type: String, required: true },
            oauthId: { type: String, required: true },
            name: { type: String, required: true },
            email: { type: String, required: true },
            goalCreated: { type: Number },
        }, { collection: 'users', versionKey: false });
    }
    createModel() {
        this.model = mongooseConnection.model("User", this.schema);
    }
    //--------------------------------------------USER CRUD METHODS--------------------------------------
    createNewUser(response, newUserInfo, emailFilter) {
        this.checkUserExists(emailFilter, (exists) => {
            if (exists) {
                let err = 'Error: email exists already';
                console.log(err);
                response.status(409).json({ error: err });
            }
            else {
                this.model.create([newUserInfo], (err) => {
                    if (err) {
                        console.log(err);
                        response.status(500).json({ error: err.message });
                    }
                    else {
                        console.log('New user added successfully');
                        response.send('New user added successfully');
                    }
                });
            }
        });
    }
    checkUserExists(filter, callback) {
        var query = this.model.findOne(filter);
        query.exec((err, itemArray) => {
            if (err) {
                console.log('Error:', err);
            }
            else {
                callback(itemArray !== null);
            }
        });
    }
    retrieveAllUsers(response) {
        var query = this.model.find({});
        query.exec((err, itemArray) => {
            if (err) {
                console.log('Error:', err);
                response.status(500).json({ error: err.message });
            }
            else {
                console.log('Retrieved all users successfully');
                response.json(itemArray);
            }
        });
    }
    retrieveUserDetails(response, filter) {
        var query = this.model.findOne(filter);
        query.exec((err, itemArray) => {
            if (err) {
                console.log('Error:', err);
                response.status(500).json({ error: err.message });
            }
            else {
                console.log('Retrieved user info successfully');
                response.json(itemArray);
            }
        });
    }
    updateUserDetails(response, userUpdate, filter) {
        this.model.findOneAndUpdate(filter, userUpdate, { upsert: true, new: true }, (err, result) => {
            if (err) {
                console.log('Error:', err);
                response.status(500).json({ error: err.message });
            }
            else {
                console.log('Updated user info successfully');
                response.json(result);
            }
        });
    }
    deleteUser(response, filter) {
        this.model.deleteOne(filter, (err, result) => {
            if (err) {
                console.log('Error:', err);
                response.status(500).json({ error: err.message });
            }
            else {
                console.log('User deleted successfully');
                response.json({ message: `${result.deletedCount} user(s) deleted` });
            }
        });
    }
}
exports.UserModel = UserModel;
