const mongoose = require('mongoose');
const { Schema } = mongoose;

const budgetSchema = new Schema({
    total: Number,
    categories: [{label: String, value: Number}]
});

module.exports = budgetSchema;