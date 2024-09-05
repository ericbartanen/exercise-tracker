import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Exercise({ exercise, onDelete, onEdit}) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td> 
                <button aria-label="edit" onClick={() => onEdit(exercise)}>
                    < MdEdit />  
                </button>        
            </td>
            <td> 
                <button aria-label="delete" onClick={()=>onDelete(exercise._id)}>
                    < MdDeleteForever /> 
                </button>
            </td>
        </tr>
    );
}

export default Exercise;