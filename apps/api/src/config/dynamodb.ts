// Create new DynamoDB instance
import * as dynamoose from "dynamoose";

function loadDynamoseConnection() {
    // const ddb = new dynamoose.aws.ddb.DynamoDB({
    //     "accessKeyId": "test",
    //     "secretAccessKey": "test",
    //     "region": "us-east-1"
    // });

    // // Set DynamoDB instance to the Dynamoose DDB instance
    // dynamoose.aws.ddb.set(ddb);
    console.info('process.env.DYNAMODB', process.env.DYNAMODB)
    dynamoose.aws.ddb.local(process.env.DYNAMODB);
}

export default loadDynamoseConnection