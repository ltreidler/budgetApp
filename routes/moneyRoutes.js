const mongoose = require('mongoose');
require('../models/Money');
require('../models/Money');

const User = mongoose.model('User');
const Money = mongoose.model('Money');

module.exports = (app) => {
    
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

        //NEXT TASK: edit the user in mongoose

        //get all relevant details
        const {first, last, email: eNew, accountValue, accountName} = req.body;
        const newName = {first, last};
        const {_id: userID} = req.user;

        //create a new money object with the user reference and first account and save it
        try {
            const money = await new Money({
                userID,
                items: {},
                bills: {},
                incomes: {label: "base", value: 0},
                //for some reason this is showing an object id, not a model
                accounts: [{label: accountName, value: accountValue}],
                budget: {total: 0, categories: [{}] }
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
    
            res.send(user);
        } catch (err) {
            res.send(err);
        }
        
    });
}

// const userSchema = new Schema({
//     googleId: String,
//     email: String,
//     name: {first: String, last: String},
//     thisMonth: {type: Number, default: 0},
//     budgetTotal: {type: Number, default: 0},
//     total: {type: Number, default: 0},
//     moneyID: {type: mongoose.Schema.Types.ObjectId, ref: 'Money', default: null},
//     new: {type: Boolean, default: true}
// });



// const moneySchema = new Schema({
//     user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
//     items: [{itemSchema}],
//     bills: [{billSchema}],
//     incomes: [{incomeSchema}],
//     accounts: [{accountSchema}],
//     budget: budgetSchema
// });


// {
//     [0]   first: 'Leah',
//     [0]   last: 'Treidler',
//     [0]   email: 'ltreidle@oberlin.edu',
//     [0]   accountValue: 0,
//     [0]   debt: 0,
//     [0]   accountName: 'dsf'
//     [0] }