const mongoose = require('mongoose');

const mySchema = new mongoose.Schema({
	name: { type: String, required: true },
	rating: { type: Number, 'default': 0, min: 0, max: 5 },
	facilities: [String],
	date: Date,
	coords: { type: { type: String }, coordinates: [Number] }
});

mySchema.index({coords: '2dsphere'});
