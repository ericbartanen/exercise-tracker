import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const navigate = useNavigate();
    
    const createExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch(`/exercises/`, {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 201) {
            alert(`You successfully created ${name}`)
        } else {
            alert('Hmm, something went wrong. Please try again.')
        }
        navigate("/");
    };

    return (
        <div>
            <h2>Create Exercise</h2>
            <div className='input-form'>
                <input
                    placeholder='Exercise Name'
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <input
                    placeholder='Number of Reps'
                    type="number"
                    value={reps}
                    onChange={e => setReps(e.target.value)} />
                <input
                    placeholder='Weight'
                    type="number"
                    value={weight}
                    onChange={e => setWeight(e.target.value)} />
                <select value={unit} onChange={e => setUnit(e.target.value)}>
                    <option value="lbs">lbs</option>
                    <option value="kgs">kgs</option>
                </select>
                <input
                    placeholder='MM-DD-YY'
                    type="string"
                    value={date}
                    onChange={e => setDate(e.target.value)} />
            </div>
            <button
                onClick={createExercise}
            >Save</button>
        </div>
    );
}

export default CreateExercisePage;