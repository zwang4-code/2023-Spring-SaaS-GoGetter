"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReminderModel = void 0;
const DataAccess_1 = require("./../DataAccess");
const Mongoose = require("mongoose");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
let mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
class ReminderModel {
    constructor() {
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            reminderId: { type: String, required: true },
            goalId: { type: String, required: true },
            userId: { type: String, required: true },
            message: { type: String },
            reminderDate: { type: Date },
        }, { collection: 'reminders', versionKey: false });
    }
    createModel() {
        this.model = mongooseConnection.model("Reminder", this.schema);
    }
    createNewReminder(response, newReminderInfo) {
        this.model.create([newReminderInfo], (err) => {
            if (err) {
                console.log(err);
                response.status(500).json({ error: err.message });
            }
            else {
                console.log('Reminder created');
                response.send('Reminder created');
            }
        });
    }
    retrieveReminderDetails(response, filter) {
        var query = this.model.findOne(filter);
        query.exec((err, itemArray) => {
            if (err) {
                response.status(500).json({ error: err.message });
            }
            else {
                response.json(itemArray);
            }
        });
    }
    retrieveAllReminder(response) {
        var query = this.model.find({});
        query.exec((err, itemArray) => {
            if (err) {
                console.log(err);
                response.status(500).json({ error: err.message });
            }
            else {
                response.json(itemArray);
            }
        });
    }
    deleteReminder(response, filter) {
        this.model.deleteOne(filter, (err, result) => {
            if (err) {
                response.status(500).json({ error: err.message });
            }
            else {
                response.json({ message: `${result.deletedCount} reminder deleted` });
            }
        });
    }
}
exports.ReminderModel = ReminderModel;
