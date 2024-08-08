import { Schema, model, models } from 'mongoose';

const CustomerSchema = new Schema({
    name: {type: String, required: [true, 'Name is required']}, 
    phoneNumber: {type: String, required: [true, 'Phone Number is required']}, 
    carModel: {type: String, required: [true, 'Car Model is required']},
});

const Customer = models.Customer || model('Customer', CustomerSchema);

export default Customer;