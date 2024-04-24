const mongoose = require('mongoose');
const validator = require('validator');



const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true  //will remove extra spacing
    },
    subject: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) { //validating email
            if (!validator.isEmail(value)) {
                throw new Error('invalid email')
            }
        }
    },

    messages:[]

}, { versionKey: false, timestamps: true })

//save user messages when the user already exists
userSchema.methods.userMessageSave = async function (newMessage) {
    try {
        this.messages = this.messages.concat({ message:newMessage });
        await this.save();
        return newMessage;
    } catch (error) {
        throw error;
    }
}


const Users = mongoose.model('user', userSchema);

module.exports = Users;