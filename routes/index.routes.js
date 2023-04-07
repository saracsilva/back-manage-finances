const router = require("express").Router();
const Finances = require("../models/Finances.model");
const User = require("../models/User.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});
router.get("/:userId/finances/past-week", async (req, res, next) => {
  try {
    const { userId } = req.params;

    const today = new Date();
    const oneWeekAgo = new Date(new Date().setDate(today.getDate() - 7));

    const allFinances = await Finances.find({
      $and: [{ user: userId }, { date: { $gte: oneWeekAgo } }],
    });

    res.status(200).json(allFinances);
  } catch (error) {
    res.status(404).json({ message: "No Finances found." });
  }
});
router.post("/finances", async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body, "post");
    //const currentUser = await User.findById(req.body.user._id);
    const finances = await Finances.create({
      ...body,
      date: new Date().toJSON().slice(0, 10),
    });
    console.log(finances, "finances");
    /*  await User.findByIdAndUpdate(req.body.user._id, {
      $push: { finances: finances },
    }); */

    res.status(201).json({ finances });
  } catch (error) {
    res.status(404).json({ message: "There was an error, please try again." });
  }
});
router.put("/finances", async (req, res, next) => {
  try {
    //const { id } = req.params;
    const { expenses, user } = req.body;
    console.log(expenses, user, "body");
    const finances = await Finances.findOne({
      $and: [{ user: user }],
    });

    await expenses.forEach(({ key, value }) => {
      finances.fixedExpenses.push({ [key]: value });
    });
    await finances.save();

    console.log(finances, "hello");

    res.json({ finances });
  } catch (error) {
    res.status(404).json({ message: "There was an error, please try again." });
  }
});

module.exports = router;
