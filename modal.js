const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');
var user2 = new Schema({
	registerName: {
		type: String
	},
	registerEmail: {
		type: String
	},
    registerPassword: {
		type: String
	},
});

// User.plugin(passportLocalMongoose);

// module.exports = mongoose.model('User', User);

const User2 = mongoose.model("User2",user2);
module.exports = User2;