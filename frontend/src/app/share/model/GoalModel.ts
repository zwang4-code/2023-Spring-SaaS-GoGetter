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
}
