import React from 'react';
import ExerciseTable from '../components/ExerciseTable';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage( { setExerciseToEdit } ) {

    const [exercises, setExercises] = useState([]);

    const navigate = useNavigate();

    const onDelete = async _id => {
        const response = await fetch(`https://exercise-tracker-js21.onrender.com/exercises/${_id}`, {method: 'DELETE'});  
        if (response.status === 204) {
            const newExercises = exercises.filter(exercise => exercise._id !== _id)
            setExercises(newExercises)
        } else {
            console.error(`Failed to delete exercise with id ${_id}, status code ${response.status}`);
        };
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        navigate("/edit-exercise");
    };

    const loadExercises = async () => {
        const response = await fetch('https://exercise-tracker-js21.onrender.com/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    };

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h2> Your Exercises </h2>
            <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseTable>
        </>
    );
};

export default HomePage;

