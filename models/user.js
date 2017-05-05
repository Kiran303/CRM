const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

const UserSchema = mongoose.Schema({

    first_name:{
        type: String,
        require: true
    },
    last_name:{
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
     email:{
        type: String,
        require: true
    },
    
     city:{
        type: String,
        require: true
    },
     state:{
        type: String,
        require: true
    },
     password:{
        type: String,
        require: true
    }
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}; 

const User = module.exports = mongoose.model('User',UserSchema);
