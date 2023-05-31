"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalModel = void 0;
const DataAccess_1 = require("./../DataAccess");
const CategoryEnum_1 = require("../enum/CategoryEnum");
const ProgressEnum_1 = require("../enum/ProgressEnum");
const Mongoose = require("mongoose");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
let mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
class GoalModel {
    constructor() {
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            goalId: { type: String, required: true },
            userId: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
            category: {
                type: String,
                enum: [CategoryEnum_1.CategoryEnum.School, CategoryEnum_1.CategoryEnum.Health, CategoryEnum_1.CategoryEnum.Career, CategoryEnum_1.CategoryEnum.Relationship, CategoryEnum_1.CategoryEnum.Reading, CategoryEnum_1.CategoryEnum.Travel],
                required: true
            },
            progress: {
                type: String,
                enum: [ProgressEnum_1.ProgressEnum.NotStarted, ProgressEnum_1.ProgressEnum.InProgress, ProgressEnum_1.ProgressEnum.Completed],
                default: ProgressEnum_1.ProgressEnum.NotStarted
            },
            reminder: Boolean,
        }, { collection: 'goals', versionKey: false });
    }
    createModel() {
        this.model = mongooseConnection.model("Goal", this.schema);
    }
    createNewGoal(response, newGoalInfo) {
        this.model.create([newGoalInfo], (err, createdGoal) => {
            if (err) {
                console.log(err);
                response.status(500).json({ error: err.message });
            }
            else {
                console.log('New goal added successfully');
                response.json(createdGoal);
            }
        });
    }
    retrieveGoalDetails(response, filter) {
        var query = this.model.findOne(filter);
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
    retrieveGoalsbyProperties(response, filter) {
        var query = this.model.find(filter);
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
    retrieveAllGoals(response, filter) {
        var query = this.model.find(filter);
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
    UpdateGoal(response, filter, update) {
        this.model.findOneAndUpdate(filter, update, { upsert: true, new: true }, (err, result) => {
            if (err) {
                response.status(500).json({ error: err.message });
            }
            else {
                response.json(result);
            }
        });
    }
    deleteGoal(response, filter) {
        this.model.deleteOne(filter, (err, result) => {
            if (err) {
                response.status(500).json({ error: err.message });
            }
            else {
                response.json({ message: `${result.deletedCount} goal(s) deleted` });
            }
        });
    }
}
exports.GoalModel = GoalModel;
