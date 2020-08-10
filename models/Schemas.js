const mongoose = require('mongoose');
const { Schema } = mongoose;


const itemSchema = new Schema({
    label: String,
    date: Date,
    category: String,
    value: Number,
    account: String
});

const subscriptionSchema = new Schema({
    label: String,
    start: Date,
    end: Date,
    category: String,
    value: Number,
    frequency: String,
    account: String
});

const incomeSchema = new Schema({
    label: String,
    start: Date,
    end: Date,
    category: String,
    value: Number,
    frequency: String,
    account: String
});

const budgetSchema = new Schema({
    total: Number,
    categories: {label: String, value: Number}
});

const accountSchema = new Schema({
    label: String,
    value: Number
});

const billSchema = new Schema({
    label: String,
    value: Number,
    start: Date,
    end: Date,
    category: String,
    frequency: Number,
    account: String
});

mongoose.model('items', itemSchema);
mongoose.model('subscriptions', subscriptionSchema);
mongoose.model('incomes', incomeSchema);
mongoose.model('budgets', budgetSchema);
mongoose.model('accounts', accountSchema);
mongoose.model('bills', billSchema);


module.exports = {
    itemSchema,
    subscriptionSchema,
    incomeSchema,
    budgetSchema,
    accountSchema,
    billSchema
}