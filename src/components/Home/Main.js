import React, { useContext} from 'react';
import googleimage from "../../Images/Login/google-icon.png";
import appleimage from "../../Images/Login/apple.png";
import { handleFbSignIn, handleGoogleSignIn, initializeLoginFramework } from '../Login/LoginManager';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';

const Main = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory();
    initializeLoginFramework();
    const handleResponse = (res, redirect) => {        
        setLoggedInUser(res);
        if (redirect) {
            history.push('/user');
        }        
    }

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }
    
    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }
    return (
        <div>
            <section data-cntnr="md" data-pdg="xl-md">
                <h1 data-pdg="-sm"><span data-bg-anim="primary">Welcome Back</span></h1>
                <p data-pdg="-md">Log in to your Geniusparkle account.</p>
                <form id="sign-in" action="" method="post">
                    <label>
                        <input type="email" name="email" required />
                        <span class="label">Email</span>
                    </label>
                    <label>
                        <input type="password" name="password" required />
                        <span class="label">Password</span>
                    </label>
                    <button data-btn="p" type="submit" name="submit">Sign In</button>
                </form>
                <button onClick={googleSignIn} className="btn mt-4 border-dark text-info"><img src={googleimage} style={{ width: 20, height: 20 }} alt="" />SignIn with Google</button><br /><br />
                <button onClick={fbSignIn} className="btn mt-4 border-dark text-info"><img src={appleimage} style={{ width: 20, height: 20 }} alt="" />SignIn with Facebook</button>
            </section>
        </div>
    );
};

export default Main;