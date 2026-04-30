const mongoose = require("mongoose");

let projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    projectLanguage: {
        type: String,
        required: true,
        enum : ["python", "java","javascript","cpp","c","go"]
    },
    code: {
        type: String,
        required: true,
    },
    createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true,
},
    date: {
        type: Date,
        default: Date.now,
    }
})
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;