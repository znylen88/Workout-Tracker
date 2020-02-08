const mongojs = require("mongojs");
const Workout = require("../models/workout.js");
var db = require("../models");

module.exports = function (app) {

    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });

    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.post("/api/workouts", function (req, res) {
        const workout = new Workout();
        workout.day = new Date().setDate(new Date().getDate());
        Workout.create(workout)
            .then(dbWorkout => {
                res.json(dbWorkout)
            })
    });

    app.put("/api/workouts/:id", (req, res) => {
        if (req.body.type === "cardio") {
            db.Workout.findOneAndUpdate(
                {
                    _id: mongojs.ObjectId(req.params.id)
                },
                {
                    $push: {
                        exercises: {
                            type: req.body.type,
                            name: req.body.name,
                            duration: req.body.duration,
                            distance: req.body.distance
                        }
                    }
                }
            )
                .then(dbWorkout => {
                    res.json(dbWorkout);
                })
                .catch(err => {
                    res.json(err);
                });
        }
        if (req.body.type === "resistance") {
            db.Workout.findOneAndUpdate(
                {
                    _id: mongojs.ObjectId(req.params.id)
                },
                {
                    $push: {
                        exercises: {
                            type: req.body.type,
                            name: req.body.name,
                            duration: req.body.duration,
                            weight: req.body.weight,
                            reps: req.body.reps,
                            sets: req.body.sets
                        }
                    }
                }
            )
                .then(dbWorkout => {
                    res.json(dbWorkout);
                })
                .catch(err => {
                    res.json(err);
                });
        }
    })
};


