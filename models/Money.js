const mongoose = require('mongoose');
const { Schema } = mongoose;
const {budgetSchema, defaultBudget} = require('./Budget');

const itemSchema = new Schema({
    label: String,
    date: Date,
    category: String,
    value: Number,
    place: String
});

const billSchema = new Schema({
    label: String,
    start: Date,
    end: Date,
    category: String,
    value: Number,
    frequency: {type: String, default: 'monthly'}
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
    budget: {type: budgetSchema, default: defaultBudget},
    spentThisMonth: {type: Number, default: 0},
    earnedThisMonth: {type: Number, default: 0},
    totalIncome: {type: Number},
    dateLastOpened: Date
});


mongoose.model('Money', moneySchema);