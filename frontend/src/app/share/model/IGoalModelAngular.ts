import { CategoryEnum } from "../enum/CategoryEnum";
import { ProgressEnum } from "../enum/ProgressEnum";


export interface IGoalModelAngular {
    goalId: string;
    userId: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    category: CategoryEnum;
    progress: ProgressEnum;
    reminder: boolean;
}
