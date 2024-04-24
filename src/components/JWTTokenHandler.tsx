import axios from 'axios';
import Cookies from 'js-cookie';
const verifyToken = async () => {
    const token = Cookies.get('token');
    if (token) {
        const expiration = JSON.parse(atob(token.split('.')[1])).exp;
        if (Date.now() >= expiration * 1000) {
        try {
            const response = await axios.post('http://localhost:8000/api/token/verify/', { token });
            console.log(response);
        } catch (error) {
            console.error('Error verifying token:', error);
        }
        }
    }
}

const handleTokenRefresh = async () => {
  verifyToken();
};

export default handleTokenRefresh;
