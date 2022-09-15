import * as dynamoose from "dynamoose";

export const UserSchema = new dynamoose.Schema({
    id: {
        type: String,
        hashKey: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: {
            type: "global",
            rangeKey: 'id',
            name: 'EmailIndex',
            project: true, // ProjectionType: ALL
            throughput: 5 // read and write are both 5
        }
    }
}, {
    "saveUnknown": true,
    "timestamps": true
});

const UserModel = dynamoose.model("User", UserSchema)

export default UserModel;

export interface UserKeyInterface {
    id: string;
}
export interface UserInterface extends UserKeyInterface {
    email: string;
    first_name: string;
    last_name?: string;
    password: string
}