const mongoose = require('moongose');

const Schema = moongose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    ismember: {type: Boolean, required: true},
    isadmin: {type: Boolean, required: true}, 
});

userSchema.vistual('fullName')
.get(function() {
    return this.name + " " + this.lastname;
})

module.exports = mongoose.model('User', userSchema);