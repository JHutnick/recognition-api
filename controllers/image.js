const Clarifai = require('clarifai');
const app = new Clarifai.App({apiKey: '3c9fed4ca87442c0b9bcf0c7c6e4f28d'});

const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with API'))
}

const updateImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'));
}
module.exports = {
	updateImage,
	handleApiCall
}