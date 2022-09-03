const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    ismember: {type: Boolean, required: true},
    isadmin: {type: Boolean, required: true}, 
});

userSchema.virtual('fullName')
.get(function() {
    return this.name + " " + this.lastname;
})

module.exports = mongoose.model('User', userSchema);