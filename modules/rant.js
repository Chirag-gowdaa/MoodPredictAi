import mongoose, { Mongoose } from 'mongoose';

const rantSchema = new mongoose.Schema({
    rantmsg: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});
const chillSchema = new mongoose.Schema({
    chillmsg: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})
const gossipSchema = new mongoose.Schema({
    gossip: {
        type: String,
        required: true
    },
})
const studyschema = new mongoose.Schema({
    plan: String
})
export const msg = mongoose.model('msg',rantSchema);
export const chillnote = mongoose.model('chillnote',chillSchema);
export const gosip = mongoose.model('gosip', gossipSchema);
export const plans = mongoose.model('plans',studyschema);

