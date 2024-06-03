const express = require("express");
const router = express.Router();
const Bikes = require("../model/bike.model");

router.get("/bikes", async (req, res) => {
  const bikes = await Bikes.find({}).lean().exec();
  res.status(200).json({ data: bikes });
});

router.get("/bikes/:id", async (req, res) => {
  const bikeId = req.params.id;
  const bikes = await Bikes.findById(bikeId).lean().exec();
  res.status(200).json({ data: bikes });
});

router.post("/filters/bikes", async (req, res) => {
  const arr = req.body;
  const bikes = await Bikes.find({ bike_name: { $in: arr } })
    .lean()
    .exec();
  res.status(200).json(bikes);
});

router.post("/bikes/filter/gg", async (req, res) => {
  console.log(req.body.arr);
  const bikes = await Bikes.find({ _id: { $in: req.body.arr } })
    .lean()
    .exec();
  res.status(200).json({ data: bikes });
});

router.post("/newbike", async (req, res) => {
  try {
    const { bike_name, bike_image, hourly_rate, kilometer_limit, locationId } = req.body;

    const newBike = new Bikes({
      bike_name,
      bike_image,
      hourly_rate,
      kilometer_limit,
      locationId,
    });

    const savedBike = await newBike.save();
    res.status(201).json({ data: savedBike });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
