const mongoose = require('mongoose');
require('../models/Money');
require('../models/Money');

const User = mongoose.model('User');
const Money = mongoose.model('Money');

module.exports = (app) => {
    
    app.post('/api/newItem', async (req, res) => {
        //receives label, date, category, value
        console.log(req.body);
        const {date, category, value, label} = req.body;
        const parsedDate = new Date(date);
        const money = await Money.findById(req.user.moneyID);
        money.items.push({date, category, value, label});
        money.accounts[0].value += value;
        if(new Date().getMonth() === parsedDate.getMonth()) {
            try{
                money.budget.categories.find(el => el.label == category).spent += value;
            } catch {
                money.budget.categories.find(el => el.label == 'Misc').spent += value;
            }
            
            money.thisMonth += value;
        }
        money.save();
        res.send(money);
    })


    app.get('/api/clearMoneys', async (req, res) => {
        await Money.deleteMany({});
        console.log('deleted moneys');
        res.redirect('/');
    });

    app.get('/api/clearUsers', async (req, res) => {
        await User.deleteMany({});
        console.log('deleted users');
        res.redirect('/');
    });


    app.get('/api/money', async (req, res) => {
        //only call this is the user exists
        const {_id} = req.user;
        //find the corresponding money and send it back
        const { moneyID: money } = await User.findById(_id)
            .populate('moneyID');

        if(money) {
            res.send(money);
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
                incomes: [{label: incomeName, value: incomeValue}]
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
}



// {
//     [0]   first: 'Leah',
//     [0]   last: 'Treidler',
//     [0]   email: 'ltreidle@oberlin.edu',
//     [0]   accountValue: 0,
//     [0]   debt: 0,
//     [0]   accountName: 'dsf'
//     [0] }