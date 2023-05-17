import {CategoryEnum} from '../enum/CategoryEnum'
import {ProgressEnum} from '../enum/ProgressEnum'

import Mongoose = require("mongoose");

interface IGoalModel extends Mongoose.Document {
    goalId: string;
    title: string;
    description: string;
    userId: string;  
    startDate: Date;
    endDate: Date;
    category: CategoryEnum;
    progress: ProgressEnum;
    reminder: boolean;
}
export {IGoalModel};