// TODO: DO I EVEN NEED THIS ONE

const { Schema, Types } = require('mongoose');

const yarnSchema = new Schema({
    material: {
        type: String,
        required: true
    },
    weight: String,
    color: String,
    skeins: {
        type: Number,
        required: true
    }
}, {
    toJSON: {
        getters: true,
    },
    id: false
})



module.exports = yarnSchema;