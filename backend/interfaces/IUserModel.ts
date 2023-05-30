import {FavoriteEnum} from '../enum/FavoriteEnum'
import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
    userId: string;
    oauthId: string;
    name: string;
    email: string;
    goals: number;
    goalList: [
        {
            goalId: string
        }
    ];
    favoriteView: FavoriteEnum
}
export {IUserModel};

