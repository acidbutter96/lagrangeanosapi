import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Student = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        require: true
    },
    document: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    telephone2: {
        type: String
    },
    gender: {
        type: Number
    },
    birthday: {
        type: Date,
        required: true
    },
    grade: {
        type: Number
    },
    course: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    products: {
        type: Object,
        required: true
    },
    monitoring: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
})

Student.plugin(mongoosePaginate)

export default mongoose.model('student', Student)