import * as dynamoose from "dynamoose";
import UserModel from "src/users/dto/users";

export const TodoSchema = new dynamoose.Schema({
    id: {
        type: String,
        hashKey: true,
        required: true,
    },
    body: {
        type: String,
        required: true,
        // index: {
        //     name: bodyIndex,
        //     global: true,
        // }
    },
    completed: Boolean,
    user: UserModel
}, {
    "saveUnknown": true,
    "timestamps": true
});

const TodoModel = dynamoose.model("Todo", TodoSchema)

export default TodoModel;