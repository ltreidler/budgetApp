const mongoose = require('mongoose');
const { Schema } = mongoose;
const {itemSchema, subscriptionSchema, incomeSchema, budgetSchema, accountSchema, billSchema} = require('./Schemas');


const userSchema = new Schema({
    googleId: String,
    email: String,
    name: {First: String, Last: String},
    items: [itemSchema],
    subscriptions: [subscriptionSchema],
    incomes: [incomeSchema],
    budget: budgetSchema,
    accounts: [accountSchema],
    bills: [billSchema],
    debt: {type: Number, default: 0},
    thisMonth: {type: Number, default: 0},
    total: {type: Number, default: 0},
    second: {type: Boolean, default: false}
});


mongoose.model('users', userSchema);