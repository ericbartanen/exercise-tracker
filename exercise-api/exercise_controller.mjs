import 'dotenv/config';
import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { body, validationResult } from 'express-validator';
import * as exercises from './exercise_model.mjs';

const PORT = process.env.PORT;
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(express.json());

// CREATE new exercise
app.post(
    '/exercises', 
    body('name').isLength({min: 1}),
    body('reps').isInt({min: 1}),
    body('weight').isInt({min: 1}),
    body('unit').isIn(['kgs', 'lbs']),
    body('date').isDate({format: "MM-DD-YY", strictMode: true, delimiters: ["-"]}),
    (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({Error: "Invalid request"})
    }

    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)    
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            res.status(400).json({Error: 'Request Failed'});
        });
});

// READ all exercises
app.get('https://exercise-tracker-js21.onrender.com/exercises', (req, res) => {
    exercises.findExercises()
        .then(exercises => {
            res.send(exercises);
        })
        .catch(error => {
            res.status(400).json({Error: 'Request Failed'});
        });
});

// READ one exercise by id
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercises => {
            if (exercises !== null) {
                res.json(exercises);  
            } else {
                res.status(404).json({ Error: "Not found"});
            }
        })
        .catch(error => {
            res.status(400).json({Error: 'Request Failed'});
        });
});

// UPDATE exercise by id
app.put(
    '/exercises/:_id', 
    body('name').isLength({min: 1}),
    body('reps').isInt({min: 1}),
    body('weight').isInt({min: 1}),
    body('unit').isIn(['kgs', 'lbs']),
    body('date').isDate({format: "MM-DD-YY", strictMode: true, delimiters: ["-"]}),
    (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({Error: "Invalid request"})
    };
    
    const exerciseId = req.params._id;

    exercises.updateExercise({_id: exerciseId}, req.body)
        .then(result => {
            if (result === 1) {
                res.json({_id: exerciseId, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date})
            } else {
                res.status(404).json({ Error: "Not found"});
            }
        })
        .catch(error => {
            res.status(400).json({Error: 'Request Failed'});
        });
});

// DELETE exercise by id
app.delete('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.deleteExercise({_id: exerciseId})
        .then(result => {
            if (result === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: "Not found"});
            }
        })
        .catch(error => {
            res.status(400).json({Error: 'Request Failed'});
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});