import {FavoriteEnum} from '../enum/FavoriteEnum'
import Mongoose = require("mongoose");

interface IUserModel extends Mongoose.Document {
    userId: string;
    oauthId: string;
    name: string;
    email: string;
    goalCreated: number;
    picture: string;
}
export {IUserModel};

