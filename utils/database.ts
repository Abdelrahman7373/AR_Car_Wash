//@ts-nocheck

import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('Mongodb is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {dbName: 'AR_Car_Wash'});
        isConnected = true;
        console.log('Mongodb is connected');
    } catch (error) {
        console.log(error);
    }
};
