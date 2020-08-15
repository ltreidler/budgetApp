const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    label: String,
    max: {type: Number, default: 0},
    spent: {type: Number, default: 0}
});


const budgetSchema = new Schema({
    total: Number,
    categories: [categorySchema]
});

const defaultBudget = {
    total: 0, 
    categories:[ 
    {label: "Rent"},
    {label: "Utilities"},
    {label: "Groceries"},
    {label: "Gas"},
    {label: "Misc"}
]}


module.exports = {budgetSchema, defaultBudget};