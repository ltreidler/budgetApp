const mongoose = require('mongoose');
const { Schema } = mongoose;
const budgetSchema = require('./Budget');

const itemSchema = new Schema({
    label: String,
    date: Date,
    category: String,
    value: Number
});

const billSchema = new Schema({
    label: String,
    start: Date,
    end: Date,
    category: String,
    value: Number,
    frequency: String
});

const incomeSchema = new Schema({
    label: String,
    value: Number
});


const accountSchema = new Schema({
    label: String,
    value: Number
});

const moneySchema = new Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    items: [itemSchema],
    bills: [billSchema],
    incomes: [incomeSchema],
    accounts: [accountSchema],
    budget: budgetSchema,
    thisMonth: {type: Number, default: 0}
});


mongoose.model('Money', moneySchema);