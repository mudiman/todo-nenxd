import { v4 as uuidv4 } from "uuid";

const appConfig = {
  apiHost: "http://localhost:3000",
  nonce: Buffer.from(uuidv4()).toString("base64"),
};

export default appConfig;
