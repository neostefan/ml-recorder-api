import { Types } from "mongoose";

interface IUser {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    samples: Array<Types.ObjectId>;
}

interface ISample {
    userId: Types.ObjectId;
    location: string;
}


export {
    IUser,
    ISample
}