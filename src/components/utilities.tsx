

export default function handleLogout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    console.log('Logged out');
    window.location.reload();
}