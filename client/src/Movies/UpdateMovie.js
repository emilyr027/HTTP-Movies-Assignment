import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialItems = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const UpdateMovie = (props) => {
    const history = useHistory();
    const { id } = useParams();
    const [item, setItem] = useState(initialItems);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(response => {
                setItem(response.data)
            })
            .catch(error => console.log(error))
    }, [id])

    const changeHandler = (e) => {
        e.persist();
        const {name, value} = e.target;
        setItem({
            ...item,
            [name]: value,
        })
    }

    const starsHandler = (e) => {
        e.persist();
        const { name, value } = e.target
        console.log(e.target.value);
        setItem({
            ...item,
            [name]: value.split("\n")
        })
        console.log(item.stars, "STARZZZ")
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, item)
            .then(response => {
                props.movieList.map((movie) => movie.id === item.id ? item : null);
                history.push(`/`)
            })
            .catch(error => console.log(error))
    }


    return(
        <div>
            <h2> Update Movie Information: </h2>
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
                        <textarea name="stars" value={item.stars.join("\n")} onChange={starsHandler} />                    
                    </div>
                    <button>Update</button>
                </form>
        </div>
)
}

export default UpdateMovie;