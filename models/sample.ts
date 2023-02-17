import { model, Schema } from "mongoose";

import { ISample } from "./definitions";

const SampleSchema = new Schema<ISample>({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },

    location: {
        type: String,
        required: true
    }
})

export default model('Samples', SampleSchema)