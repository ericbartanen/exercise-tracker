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
        const response = await fetch(`/exercises`, {
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
            <h2>New PR</h2>
            <div className='input-form'>
                <label for='exercise'>Exercise Name:</label>
                <input
                    id='exercise'
                    placeholder='Exercise Name'
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <label for='reps'>Number of Reps:</label>
                <input
                    id='reps'
                    placeholder='Number of Reps'
                    type="number"
                    value={reps}
                    onChange={e => setReps(e.target.value)} />
                <label for='weight'>Weight:</label>
                <input
                    id='weight'
                    placeholder='Weight'
                    type="number"
                    value={weight}
                    onChange={e => setWeight(e.target.value)} />
                <label for='units'>Units:</label>
                <select id='units' value={unit} onChange={e => setUnit(e.target.value)}>
                    <option value="lbs">lbs</option>
                    <option value="kgs">kgs</option>
                </select>
                <label for='date'>Date:</label>
                <input
                    id='date'
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