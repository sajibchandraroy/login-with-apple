import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import Header from '../Home/Header';
import { handleSignOut } from '../Login/LoginManager';

const User = () => {
    let history = useHistory();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    
    const handleLogout = () => {
        sessionStorage.clear();
        handleSignOut()
        history.push('/home')

    }
    return (
        <div>
            <div>

                <div className="row d-flex justify-content-center ">
                   
                    <img src={loggedInUser.photo} alt="" style={{ borderRadius: '20%', width: '5%' }} />
                    <button className="btn btn-link" style={{ textDecoration: 'none', color: 'black' }}>{loggedInUser.name}</button>
                    <button onClick={handleLogout} className="btn btn-danger my-2 ml-3" style={{ borderRadius: '10px', width: '70px' }}>
                        Logout
                    </button>
                </div>

            </div>
        </div>
    );
};

export default User;