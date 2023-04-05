const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});
router.get("/:userId/finances", async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log("blablabla");
    /* const today = new Date();
    const oneWeekAgo = new Date(new Date().setDate(today.getDate() - 7)); */

    const allFinances = await Finances.find({
      $and: [{ user: userId } /* { date: { $gte: oneWeekAgo } } */],
    });

    res.status(200).json(allFinances);
  } catch (error) {
    res.status(404).json({ message: "No Finances found." });
  }
});

module.exports = router;
