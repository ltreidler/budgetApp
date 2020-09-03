require('../models/Money');
const mongoose = require('mongoose');
const _ = require('lodash');

const User = mongoose.model('User');
const Money = mongoose.model('Money');


module.exports = (app) => {
    app.post('/api/editCategory', async (req, res) => {
        const {moneyID} = req.user;
        const {category, max} = req.body;
        const money = await Money.findById(moneyID);
        _.each(money.budget.categories, (el) => {
            if(el.label == category) {
                money.budget.total += max - el.max;
                el.max = max;
            }
        });
        
        money.save();
        res.send(money);
    });

    app.post('/api/createCategory', async (req, res) => {
        const {max, category, color} = req.body;
        const {moneyID} = req.user;
        const money = await Money.findById(moneyID);
        money.budget.categories.push({label: category, max, color});
        money.budget.total += max;
        money.save();
        res.send(money);
    })
}

// const categorySchema = new Schema({
//     label: String,
//     max: {type: Number, default: 10},
//     spent: {type: Number, default: 0},
//     color: String
// });