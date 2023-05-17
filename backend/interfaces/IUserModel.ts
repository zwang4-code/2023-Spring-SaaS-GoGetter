import {FavoriteEnum} from '../enum/FavoriteEnum'
import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
    userId: string;
    name: string;
    email: string;
    goalList: [
        {
            goalId: string
        }
    ];
    favoriteView: FavoriteEnum
}
export {IUserModel};

