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
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const UserModel = dynamoose.model("User", UserSchema)

export default UserModel;