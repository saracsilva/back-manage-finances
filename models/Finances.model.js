const { Schema, model } = require("mongoose");
const financesSchema = new Schema({
  totalValue: {
    type: Number,
  },
  date: { type: Date },
  fixedExpenses: [
    {
      type: Map,
      of: { type: Number },
      /* default: new Map([
        ["Rent", 0],
        ["Utilities", 0],
        ["Groceries", 0],
      ]), */
    },
  ],
  user: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
});
const Finances = model("Finances", financesSchema);

module.exports = Finances;
