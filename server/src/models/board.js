const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { schemaOptions } = require('./modelOptions');

const boardSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        icon: {
            type: String,
            default: '📃',
        },
        description: {
            type: String,
            default: `Add description here
        🟢 You can add multiline description
        🟢 Let's start...`,
        },
        title: {
            type: String,
            default: 'Untitled',
        },
        position: {
            type: Number,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        favoritePosition: {
            type: Number,
            default: 0,
        },
    },
    schemaOptions
);

module.exports = mongoose.model('Board', boardSchema);
