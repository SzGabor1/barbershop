import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitButton from './uiElements/submitButton';
import axios from 'axios';
import handleLogout from './utilities';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
    const token = localStorage.getItem('access_token');
       

    if (!token) {
        navigate('/login');
    }else{
        // const encodedUsername = token.split('.')[1]
        // console.log(encodedUsername)
        // const decodedUsername = atob(encodedUsername)
        // console.log(decodedUsername)
        // setUsername(JSON.parse(decodedUsername).user_id)
        // console.log(username)
        axios.get('http://localhost:8000/api/getUser/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            //console.log(response);
            //setUsername(response.data.username);
            setUsername(response.data.username);
        }).catch((error) => {
            console.log(error);
        });


    }




    }, []); 



    return (
<div className="text-3xl text-center">
    <h1>Welcome <span className="underline">{username}</span> to the Home page!</h1>

    <SubmitButton onSubmit={handleLogout} label="Logout" labelcolor="white" bgcolor="red"
    />

</div>

    );
};

export default Home;

