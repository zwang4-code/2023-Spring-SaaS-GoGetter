import Mongoose = require("mongoose");

interface IReminderModel extends Mongoose.Document {
    reminderId: string;
    goalId: string;
    userId: string; 
    message: string;
    reminderDate: Date;
}
export {IReminderModel};