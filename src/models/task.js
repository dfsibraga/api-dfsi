const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
    descricao: {
        type: String,
        trim: true, // Data sanitization
        required: true // Data validation
    },
    /*idade: {
        type: Number,
        validate(value) {
            if (value <0) {
                throw new Error('Idade inválida!')
            }
        }
    },*/
    efetuada: {
        type: Boolean,
        default: false
    }
});

module.exports = Task;