const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        name: {type: String, required:[true, "Please enter project name"], trim: true, maxlength: 50},
        isInbox: {type: Boolean, default: false},
    },
    {
        timestamps: true,
    }
)

projectSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        return ret;
    },
});

module.exports = mongoose.model("Project", projectSchema);