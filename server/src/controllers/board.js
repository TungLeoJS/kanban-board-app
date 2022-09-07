const Board = require('../models/board');
const Section = require('../models/section');
const Task = require('../models/task');
const user = require('../models/user');

exports.create = async (req, res) => {
    try {
        const boardCount = Board.find().count();
        const board = Board.create({
            user: req.user._id,
            position: boardCount > 0 ? boardCount : 0,
        });
        res.status(201).json(board);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getAll = async (req, res) => {
    try {
        const board = Board.find({ user: req.user._id }).sort('-position');
        res.status(201).json(board);
    } catch (err) {
        res.status(500).json(err);
    }
};
