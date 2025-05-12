import mongoose from 'mongoose'
import comment from './song.ts'

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date },
  about: { type: String },
  cover: { type: String, default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' },
  songs: [{ type: mongoose.Schema.ObjectId, ref: 'Song' }],
  albums: [{ type: mongoose.Schema.ObjectId, ref: 'Album' }],
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  comments: [comment],
  likesCount: { type: Number, default: 0 },
})

export default mongoose.model('Artist', artistSchema)