import mongoose from 'mongoose'
mongoose.Promise = global.Promise

const modelSchema = new mongoose.Schema({
    idNPC: mongoose.Types.ObjectId,
    name: String,
    category: mongoose.Types.ObjectId,
    type: { type: String, enum: ['buy', 'sell'] },
    value: Number,
    time: Number
})

const modelName = "Services"

if (mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName]
} else {
    module.exports = mongoose.model(modelName, modelSchema)
}