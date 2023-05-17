import { CategoryEnum } from "../enum/CategoryEnum";
import { ProgressEnum } from "../enum/ProgressEnum";

// This is the goal model class.
// Note the variable ! means that this variable is required

export class GoalModel{
  goalId!: string;
  userId!: string;
  title!: string;
  category!: CategoryEnum;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  progress?: ProgressEnum;
  reminder?: boolean;

//   constructor (
//     public goalId: string,
//     public userId: string,
//     public title: string,
//     public category: CategoryEnum,
//     public description?: string,
//     public startDate?: Date,
//     public endDate?: Date,
//     public progress?: ProgressEnum,
//     public reminder?: boolean,
//   ) {  }
}
