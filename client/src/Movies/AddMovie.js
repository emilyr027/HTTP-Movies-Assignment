import React, {useState} from 'react';
import axios from 'axios';

const initialValues = {
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: [],
}

const AddMovie = () => {
    const [item, setItem] = useState(initialValues);

    const changeHandler = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setItem({
            ...item,
            [name]: value, 
        })
        console.log(item);
    }

    const starsHandler = (e) => {
        const {name, value} = e.target;
        setItem({
            ...item,
            [name]: value.split('\n')
        })
        console.log(item)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/movies', item)
            .then(response => {
                setItem(initialValues);
                window.location = '/'
            })
            .catch(error => console.log(error))
    }

    return(
        <div>
            <h2>Add a Movie:</h2>
            <form onSubmit={submitHandler}>
                <input
                type='text'
                name='title'
                value={item.title}
                onChange={changeHandler}
                placeholder='Title'                
                >
                </input>

                <input
                type='text'
                name='director'
                value={item.director}
                onChange={changeHandler}
                placeholder='Director'                
                >
                </input>

                <input
                type='number'
                name='metascore'
                value={item.metascore}
                onChange={changeHandler}
                placeholder='Metascore'                
                >
                </input>

                <div className='actors'>
                    <textarea name='stars' value={item.stars.join('\n')} onChange={starsHandler} placeholder='Add Featured Actors Here'/>
                </div>

                <button>Submit</button>
            </form>
        </div>
    )
}

export default AddMovie;