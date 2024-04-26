export default function handleLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    console.log('Logged out');
    window.location.reload();
}

import axios, { AxiosError } from 'axios';

const backendURL: string = import.meta.env.VITE_BACKENDURL;

let tokenRefreshed: boolean = false;





async function performRefresh(refresh_token: string): Promise<boolean> {
    try {
        const headers = {
            'Content-Type': 'application/json', 

        };

        const data = {
            refresh: refresh_token
        };
        const refreshResponse = await axios.post(
            `${backendURL}/api/token/refresh/`,
            data,
            { headers }
        );

        console.log('Token refresh response:', refreshResponse.data);

        if (refreshResponse.status === 200) {
            const newAccessToken = refreshResponse.data.access;


            if (newAccessToken) {
                console.log('New access token:', newAccessToken);

                localStorage.setItem('access_token', newAccessToken);
                console.log('Token refreshed successfully.');
                return true; 
            } else {
                console.error('Error: New access token is missing in the response.');
                return false; 
            }
        } else {
            console.error('Error: Token refresh request failed with status', refreshResponse.status);
            return false; 
        }
    } catch (refreshError) {
        if (axios.isAxiosError(refreshError)) {
            const axiosError: AxiosError = refreshError;
            console.error('Error refreshing token:', axiosError.response?.data || axiosError.message);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            console.log('Tokens removed from localStorage.');
            return false;
        } else {
            console.error('Error refreshing token:', refreshError);
        }
        return false;
    }
}


export async function verifyAndRefreshToken(): Promise<boolean> {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');

    if (!access_token && !refresh_token) {
        console.error('No access token or refresh token found.');
        return false;
    }


    const getExpiration = (token: string) => {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp;
    };

    const expiration = access_token ? getExpiration(access_token) : (refresh_token ? getExpiration(refresh_token) : null);

    if (expiration && Date.now() >= expiration * 1000) {

        if (refresh_token) {
            const refreshSuccessful = await performRefresh(refresh_token);
            if (!refreshSuccessful) {
                console.error('Failed to refresh access token.');
                return false;
            }
            tokenRefreshed = true;
        } else {
            console.error('Access token expired and no refresh token available.');
            return false;
        }
    }


    if (!tokenRefreshed) {
        try {
            const tokenToVerify: string = access_token || localStorage.getItem('access_token') || '';
            const verifyResponse = await axios.post(`${backendURL}/api/token/verify/`, { token: tokenToVerify });
            console.log('Token verified successfully:', verifyResponse.data);
            return true; 
        } catch (verifyError) {
            console.error('Error verifying token:', verifyError);

            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            console.log('Tokens removed from localStorage.');
            return false;
        }
    }
    tokenRefreshed = false; 
    return false; 
}
