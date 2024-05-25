const mongoose = require('mongoose');

const viewerCountSchema = new mongoose.Schema({
    count: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('ViewerCount', viewerCountSchema);