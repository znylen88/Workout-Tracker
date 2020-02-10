const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", ({ body }, res) => {
    console.log(body)
    var workout = {
        exercises:
        {
            type: body.type,
            name: body.name,
            duration: body.duration,
            weight: body.weight,
            reps: body.reps,
            sets: body.sets,
            distance: body.distance
        },

    }
    Workout.create(workout, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    })
        .then(dbWorkout => {
            console.log(dbWorkout)
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.put("/api/workouts/:id", (req, res) => {
    var exercise = req.body;
    Workout.findByIdAndUpdate(req.params.id, {
        $push: { exercises: exercise }
    }, { new: true })
        .then(function (dbWorkout) {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts", (req, res) => {
    console.log("Getting exercise info")
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    console.log("Getting exercise info")
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;
