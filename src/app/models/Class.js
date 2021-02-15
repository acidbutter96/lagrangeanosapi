import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Class = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    subclass: {
        type: String,
        required: true
    },
    vacancies: {
        type: Number,
        required: true
    },
    studentsin: {
        type: Number,
        required: true
    },
    professor: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
},{
    timestamps: true
})

Class.plugin(mongoosePaginate)

export default new mongoose.model('class',Class)