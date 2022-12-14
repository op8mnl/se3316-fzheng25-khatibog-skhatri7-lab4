import { Schema, model } from "mongoose";

const PlaylistSchema = new Schema({
	playlist_id: {
		type: String,
		required: false,
		unique: true,
	},
	playlist_name: {
		type: String,
		required: false,
		unique: true,
	},
	isPublic: {
		type: Boolean,
		default: false,
	},
	description: String,

	creator: {
		type: String,
		default: "parlayleague420@gmail.com",
	},
	rating: {
		type: Number,
		default: 0,
	},
	no_of_tracks: {
		type: Number,
		required: true,
	},
	requests: [
		{
			req_type: String,
			date: String,
		},
	],
	tracks: [
		{
			_id: false,
			track_id: Number,
			album_name: String,
			track_name: String,
			artist: String,
			duration: String,
			album_id: Number,
			artist_id: Number,
			tags: String,
			track_date_created: String,
			track_date_recorded: String,
			track_genres: String,
		},
	],
	total_duration: String,
});

export default model("Playlist", PlaylistSchema);
