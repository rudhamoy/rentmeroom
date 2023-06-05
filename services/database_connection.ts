import mongoose from "mongoose";

const options = {
    dbName: "rentmeroom"
};


const conn = mongoose.createConnection(process.env.MONGODB_URL);

export default conn