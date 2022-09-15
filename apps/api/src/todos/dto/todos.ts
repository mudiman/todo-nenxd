import * as dynamoose from "dynamoose";
import UserModel from "../../users/dto/users";

export const TodoSchema = new dynamoose.Schema({
    id: {
        type: String,
        hashKey: true,
    },
    body: {
        type: String,
        required: true,
        index: {
            type: "global",
            rangeKey: 'id',
            name: 'BodyIndex',
            project: true, // ProjectionType: ALL
            throughput: 5 // read and write are both 5
        }
    },
    completed: {
        type: Boolean,
        default: false,
    },
    user: UserModel
}, {
    "saveUnknown": true,
    "timestamps": true
});

const TodoModel = dynamoose.model("Todo", TodoSchema)

export interface UserKey {
    id: string;
}
export interface User extends UserKey {
    email: string;
    first_name: string;
    last_name?: string;
}

export default TodoModel;

export interface TodoKeyInterface {
    id: string;
}
export interface TodoInterface extends TodoKeyInterface {
    id: string;
    body?: string;
    completed?: boolean,
    user?: Object
}