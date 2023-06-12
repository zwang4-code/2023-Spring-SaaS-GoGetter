import { DataAccess } from '../DataAccess';
import { IUserModel } from '../interfaces/IUserModel';
import Mongoose = require("mongoose");

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class UserModel {
    public schema: any;
    public innerSchema: any;
    public model: any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                userId: { type: String, required: true },
                oauthId: { type: String, required: true },
                name: { type: String, required: true },
                email: { type: String, required: true },
                goalCreated: { type: Number },
                picture: { type: String },
            }, { collection: 'users', versionKey: false }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IUserModel>("User", this.schema);
    }

    //--------------------------------------------USER CRUD METHODS--------------------------------------

    public getUserIdByOauthId = async function (oauthId: string): Promise<string | null> {
        const user = await this.model.findOne({ oauthId });
        return user ? user.userId : null;
    };

    public async createNewUser(newUserInfo: Object): Promise<void> {
        return new Promise((resolve, reject) => {
          this.model.create([newUserInfo], (err: any) => {
            if (err) {
              console.log(err);
              reject(new Error(err.message));
            }
            console.log('New user added successfully')
            resolve();
          });
        });
      }

    public retrieveAllUsers(response: any): any {
        var query = this.model.find({});
        query.exec((err: any, itemArray: any) => {
            if (err) {
                console.log('Error:', err);
                response.status(500).json({ error: err.message });
            } else {
                console.log('Retrieved all users successfully')
                response.json(itemArray);
            }
        });
    }

    public retrieveUserDetails(response: any, filter: Object) {
        var query = this.model.findOne(filter);
        query.exec((err: any, itemArray: any) => {
            if (err) {
                console.log('Error:', err);
                response.status(500).json({ error: err.message });
            } else {
                console.log('Retrieved user info successfully');
                response.json(itemArray);
            }
        });
    }

    public updateUserDetails(response: any, userUpdate: Object, filter: Object) {
        this.model.findOneAndUpdate(filter, userUpdate, { upsert: true, new: true }, (err: any, result: any) => {
            if (err) {
                console.log('Error:', err);
                response.status(500).json({ error: err.message });
            } else {
                console.log('Updated user info successfully')
                response.json(result);
            }
        });
    }

    public deleteUser(response: any, filter: Object) {
        this.model.deleteOne(filter, (err: any, result: any) => {
            if (err) {
                console.log('Error:', err);
                response.status(500).json({ error: err.message });
            } else {
                console.log('User deleted successfully');
                response.json({ message: `${result.deletedCount} user(s) deleted` });
            }
        });
    }
}

export { UserModel };