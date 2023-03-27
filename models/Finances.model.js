const { Schema, model } = require("mongoose");
const financesSchema = new Schema({
  totalValue: {
    type: Number,
  },
  date: { type: Date },

  user: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
});
const Finances = model("Finances", financesSchema);

module.exports = Finances;
