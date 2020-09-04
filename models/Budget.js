const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    label: String,
    max: {type: Number, default: 10},
    spent: {type: Number, default: 0},
    color: String
});


const budgetSchema = new Schema({
    total: Number,
    categories: [categorySchema]
});

const defaultBudget = {
    total: 50, 
    categories:[
    {label: "Rent", color: "red"},
    {label: "Utilities", color: "purple"},
    {label: "Groceries", color: "blue"},
    {label: "Gas", color: "indigo"},
    {label: "Misc", color: "orange"}
]}


module.exports = {budgetSchema, defaultBudget};