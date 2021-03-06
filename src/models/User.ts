import mongoose from 'mongoose'
mongoose.Promise = global.Promise

const modelSchema = new mongoose.Schema({
    username: String,
    email: String,
    passHash: String,
    token: String,
    nameIndexMessages: String,
    mnemonic: String,
    seed: String,
    address: String,
    typeNPC: Boolean,
})

const modelName = "User"

if (mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName]
} else {
    module.exports = mongoose.model(modelName, modelSchema)
}