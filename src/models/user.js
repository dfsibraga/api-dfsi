const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    codigo: {
        type: String,
        trim: true,
        required: true
    },
    nome: {
        type: String,
        trim: true, // Data sanitization
        required: true // Data validation
    },
    password: {
        type: String,
        required: true // Data validation
    }    
});

userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    };

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;