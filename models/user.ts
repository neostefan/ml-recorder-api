import { model, Schema } from "mongoose";

import { IUser } from "./definitions";

const UserSchema = new Schema<IUser>({

    email: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    // samples: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "Samples"
    //     }
    // ]
})

export default model("Users", UserSchema)