var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');

// user schema 
var UserSchema   = new Schema({
	name: String,
	username: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true, select: false }
});

// hash password before it's saved
// mongoose api pre('<option>',<async t/f>, func)
UserSchema.pre('save', function(next){
	console.log(this);
	var user = this;
	// hash the password if it has been changed
	if(!user.isModified('password')) return next();

	// generate hash
	bcrypt.hash(user.password, null, null, function(err, hash){
		if(err) return next(err);
		user.password = hash;
		console.log(next);
		next();

	});
});

// compare password
UserSchema.methods.comparePassword = function(password){
	var user = this;
	return bcrypt.compareSync(password, user.password);
};

// return the model
module.exports = mongoose.model('User', UserSchema);


