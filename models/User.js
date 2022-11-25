const { Schema, model } = require('mongoose');

// TODO: UPDATE USER

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'project'
        }
    ]
}, {
    toJSON: {
        virtuals: true,
    },
    id: false
})

const User = model('user', userSchema)

module.exports = User;