import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');

    useEffect(() => {

    const token = localStorage.getItem('access_token');
       

    if (!token) {
        navigate('/login');
    }else{

        axios.get('http://localhost:8000/api/getUser/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setUsername(response.data.username);
        }).catch((error) => {
            console.log(error);
        });


    }




    }, []); 



    return (
<div className="text-3xl text-center">
    <h1>Welcome <span className="underline">{username}</span> to the Home page!</h1>


</div>

    );
};

export default Home;

