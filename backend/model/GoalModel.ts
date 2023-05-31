import {DataAccess} from './../DataAccess';
import {IGoalModel} from '../interfaces/IGoalModel';
import { CategoryEnum } from '../enum/CategoryEnum';
import { ProgressEnum } from '../enum/ProgressEnum';
import { STATUS_CODES } from "http";
import Mongoose = require("mongoose");

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class GoalModel {
    public schema:any;
    public innerSchema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                goalId: {type: String, required: true},
                userId: {type: String, required: true},
                title: {type: String, required: true},
                description: {type: String},
                startDate: {type: Date},
                endDate: {type: Date},
                category: {
                    type: String,
                    enum: [CategoryEnum.School, CategoryEnum.Health, CategoryEnum.Career, CategoryEnum.Relationship,CategoryEnum.Reading, CategoryEnum.Travel],
                    required: true
                },
                progress: {
                    type: String,
                    enum: [ProgressEnum.NotStarted, ProgressEnum.InProgress, ProgressEnum.Completed],
                    default: ProgressEnum.NotStarted
                },
                reminder: Boolean,
            },  {collection: 'goals', versionKey: false}, 
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IGoalModel>("Goal", this.schema);
    }

    public createNewGoal(response: any, newGoalInfo: Object): void {
      this.model.create([newGoalInfo], (err: any, createdGoal: any) => {
                  if (err) {
                      console.log(err);
                      response.status(500).json({ error: err.message });
                  }
                  else {
                      console.log('New goal added successfully')
                      response.json(createdGoal);
                  }
              });
  }
    
    public retrieveGoalDetails(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec((err, itemArray: any) => {
          if (err){
            console.log(err);
            response.status(500).json({ error: err.message });
          }
          else {
            response.json(itemArray);
          } 
        });
    }

    public retrieveGoalsbyProperties(response:any, filter:Object) {
        var query = this.model.find(filter);
        query.exec((err, itemArray: any) => {
          if (err){
            console.log(err);
            response.status(500).json({ error: err.message });
          }
          else {
            response.json(itemArray);
          } 
        });
    }

    public retrieveAllGoals(response:any, filter:Object): any {
        var query = this.model.find(filter);
        query.exec((err, itemArray: any) => {
          if (err){
            console.log(err);
            response.status(500).json({ error: err.message });
          }
          else {
            response.json(itemArray);
          } 
        });
    }

    public UpdateGoal(response: any, filter: Object, update: Object) {
        this.model.findOneAndUpdate(filter, update, { upsert: true, new: true }, (err: any, result: any) => {
          if (err) {
            response.status(500).json({ error: err.message });
          } else {
            response.json(result);
          }
        });
      }
      

    public deleteGoal(response: any, filter: Object) {
        this.model.deleteOne(filter, (err: any, result: any) => {
          if (err) {
            response.status(500).json({ error: err.message });
          } else {
            response.json({ message: `${result.deletedCount} goal(s) deleted` });
          }
        });
      }
      

}
export {GoalModel};