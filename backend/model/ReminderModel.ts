import {DataAccess} from './../DataAccess';
import {IReminderModel} from '../interfaces/IReminderModel';
import Mongoose = require("mongoose");

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class ReminderModel {
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
                reminderId: {type: String, required: true},
                goalId: {type: String, required: true},
                userId: {type: String, required: true},
                message: {type: String},
                reminderDate: {type: Date},
            },  {collection: 'reminders', versionKey: false}, 
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IReminderModel>("Reminder", this.schema);
    }

    public createNewReminder(response: any, newReminderInfo: Object): void {
        this.model.create([newReminderInfo], (err: any) => {
                    if (err) {
                        console.log(err);
                        response.status(500).json({ error: err.message });
                    }
                    else {
                        console.log('Reminder created')
                        response.send('Reminder created');
                    }
                });
    }

    public retrieveReminderDetails(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec((err, itemArray: any) => {
            if (err){
                response.status(500).json({ error: err.message });
            }
            else
            {
                response.json(itemArray);
            }
            
        });
    }

    public retrieveAllReminder(response:any): any {
        var query = this.model.find({});
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

    public deleteReminder(response: any, filter: Object) {
        this.model.deleteOne(filter, (err: any, result: any) => {
          if (err) {
            response.status(500).json({ error: err.message });
          } else {
            response.json({ message: `${result.deletedCount} reminder deleted` });
          }
        });
      }
}
export {ReminderModel};