import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Student = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    classes: {
        type: String,
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