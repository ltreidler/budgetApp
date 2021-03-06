const mongoose = require('mongoose');
require('../models/Money');
const insertNewItem = require('../middlewares/insertNewItem');
const resortItems = require('../middlewares/resortItems');
const _ = require('lodash');

const User = mongoose.model('User');
const Money = mongoose.model('Money');

const updateThisMonth = async (moneyID) => {
    console.log('Updating money');
    const money = await Money.findById(moneyID);
    money.earnedThisMonth = 0;
    money.spentThisMonth = 0;
    _.each(money.budget.categories, ({spent, label, _id}) => {
        money.budget.categories.find(el => el.label == label).spent = 0;
        console.log('Updated '+label);
    });
    console.log(money.budget.categories);
    // _.each(money.incomes, ({value}) => {
    //     money.earnedThisMonth += value;
    // })
    _.each(money.items, ({category, value, date}) => {
        try {
            const today = new Date();
            if((date.getMonth() == today.getMonth()) && (today.getFullYear() === date.getFullYear())){
                if(category) {
                    money.budget.categories.find(el => el.label == category).spent -= value;
                    money.spentThisMonth -= value;
                } else {
                    money.earnedThisMonth += value;
                }
            }
            console.log(money.budget.categories);
        } catch (err) {
            console.log('error: '+err);
        }
    })
    money.dateLastOpened = new Date();
    const newMoney = money;
    money.save();
    return newMoney;
}

module.exports = (app) => {

    app.post('/api/editProfile', async (req, res) => {
        console.log(req.body);
        const money = await Money.findById(req.user.moneyID);
        
    })
    
    app.post('/api/newItem', async (req, res) => {
        //receives label, date, category, value
        console.log(req.body);
        const {date, category, value, label, place} = req.body;
        const parsedDate = new Date(date);
        const money = await Money.findById(req.user.moneyID);
        newItemArray = insertNewItem(date, category, value, label, place, money.items);
        money.items = newItemArray;
        money.accounts[0].value += value;
        if((new Date().getMonth() === parsedDate.getMonth()) && (new Date().getFullYear() === parsedDate.getFullYear())) {
            if(category && value < 0) {
                try{
                    money.budget.categories.find(el => el.label == category).spent -= value;
                } catch {
                    money.budget.categories.find(el => el.label == 'Misc').spent -= value;
                }
                money.spentThisMonth -= value;
            } else {
                money.earnedThisMonth += value;
            }
            
        }
        money.save();
        res.send(money);
        
    })

    app.post('/api/editItem', async (req, res) => {
        const {label, value, place, id} = req.body;
        const money = await Money.findById(req.user.moneyID);
        const item = money.items.find(item => item._id == id);

        console.log(req.body);
        label ? item.label = label : null;
        place ? item.place = place : null;

        const date = new Date(item.date);

        if(value) {
            const valChange = value - item.value;
            money.accounts[0].value += valChange;
            if(new Date().getMonth() == date.getMonth()) {
                if(value < 0) {
                    try{
                        console.log(valChange);
                        money.budget.categories.find(el => el.label == item.category).spent -= valChange;
                    } catch {
                        money.budget.categories.find(el => el.label == 'Misc').spent -= valChange;
                    }
                    money.spentThisMonth -= valChange;
                } else {
                    money.earnedThisMonth += valChange;
                }
            }
            item.value = value;
        }
        money.save();
    })


    app.get('/api/clearData', async (req, res) => {
        if(process.env.NODE_ENV != 'production'){
            await Money.deleteMany({});
            await User.deleteMany({});
            res.redirect('/');
        }
        
    });

    app.get('/api/money', async (req, res) => {
        //only call this is the user exists
        const {_id} = req.user;
        //find the corresponding money and send it back
        const { moneyID: money } = await User.findById(_id)
            .populate('moneyID');
        const today = new Date();
        if(money) {
            if(money.dateLastOpened.getMonth() != today.getMonth()){
                const newMoney = await updateThisMonth(money._id);
                res.send(newMoney);
            } else {
                res.send(money);
            }
        } else {
            //if the money doesn't exist, that means the user is new
            res.send(false);
        }
    })
    
    
    app.post('/api/setupUser', async (req, res) => {

        //get all relevant details
        const {first, last, email: eNew, accountValue, accountName, incomeValue, incomeName} = req.body;
        const newName = {first, last};
        const {_id: userID} = req.user;

        //create a new money object with the user reference and first account and save it
        try {
            const money = await new Money({
                userID,
                items: {},
                bills: {},
                accounts: [{label: accountName, value: accountValue}],
                dateLastOpened: new Date(),
                incomes: [{label: incomeName, value: incomeValue}],
                totalIncome: incomeValue
            }).save();

            //get the object ID from the new money object
            const {_id: moneyID} = money;
    
            //find the user and update it with the new name, email, and money object id
            const user = await (await User.findByIdAndUpdate(userID, 
                {
                    name: newName, 
                    email: eNew, 
                    moneyID
                })).save();
    
            res.send({user, money});
        } catch (err) {
            res.send(err);
        }
        
    });

    app.get('/api/resortItems', async (req,res) => {
        //only call this is the user exists
        const {moneyID} = req.user;
        //find the corresponding money and send it back
        const money = await Money.findById(moneyID);
            //need to make sure thisMonth checks the year
        money.items = resortItems(money.items);
        money.save()
        res.send(money);
    })
}



// {
//     [0]   first: 'Leah',
//     [0]   last: 'Treidler',
//     [0]   email: 'ltreidle@oberlin.edu',
//     [0]   accountValue: 0,
//     [0]   debt: 0,
//     [0]   accountName: 'dsf'
//     [0] }