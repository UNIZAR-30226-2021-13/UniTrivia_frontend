import React, {useState} from 'react'
import axios from "axios";
import {setUserSession} from "./Utils/Common";

function ChangePassword(props) {
    const [loading, setLoading] = useState(false);
    const username = useFormInput('');
    const password = useFormInput('');
    const newPassword = useFormInput('');
    const [error, setError] = useState(null);

    // handle button click of login form
    const handleModify = () => {
        setError(null);
        setLoading(true);
        axios.post('https://unitrivi.com/api/profile/modify/password/'+{username}, { username: username.value, new_password: newPassword.value , old_Password: password.value }).then(response => {
            setLoading(false);
            //setUserSession(response.data.token, response.data.user);
            props.history.push('/login');
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
    }


    return (
        <div>
            Recupera la contraseña<br/><br/>
            <div>
                Usuario<br/>
                <input type="text" {...username}  autoComplete="new-password"/>
            </div>
            <div style={{marginTop: 10}}>
                Actual contraseña<br/>
                <input type="password" {...password}  autoComplete="new-password"/>
            </div>
            <div style={{marginTop: 10}}>
                Nueva contraseña<br/>
                <input type="password" {...newPassword}  autoComplete="new-password"/>

            </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <input type="button" value={loading ? 'Loading...' : 'Confirmar'} onClick={handleModify} disabled={loading} /><br />
        </div>
    );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}



export default ChangePassword;