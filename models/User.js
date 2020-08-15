const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    email: String,
    name: {first: String, last: String},
    moneyID: {type: mongoose.Schema.Types.ObjectId, ref: 'Money', default: null}
});


mongoose.model('User', userSchema);