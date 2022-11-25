
// TODO: UPDATE
const { Schema, model } = require('mongoose');
const Yarn = require('./Yarn')

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        maxLength: 500
    },
    completed: {
        type: Boolean,
        default: false
    },
    hook: String,
    yarns: [Yarn]
}, {
    toJSON: {
        virtuals: true,
    },
    id: false
})

const Project = model('project', projectSchema)

module.exports = Project;