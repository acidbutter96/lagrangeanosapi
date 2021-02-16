import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Product = new mongoose.Schema({
    product: {
        type: String,
        required: true
    },
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
}, {
    timestamps: true
})

Product.plugin(mongoosePaginate)

export default new mongoose.model('product', Product)