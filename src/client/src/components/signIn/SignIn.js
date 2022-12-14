import { React, useState, createRef } from 'react';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
    textNumberValidate,
    emailValidate,
} from "react-validations-components";
import '../../styles/SignIn.scss';
import { initUser } from '../../slices/userSlice';
import { changeSignIn } from '../../slices/signInSlice';

export default function SignIn(props) {

    const dispatch = useDispatch();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const inputEmail = createRef();
    const inputPassword = createRef();
    const userExist = createRef();
    const checkbox = createRef();

    const close = () => {
        dispatch(changeSignIn(false));
    }

    // Check the email and the password.
    const signIn = async () => {
        let insert = true;
        if (!emailValidate(email).status || email === undefined) {
            inputEmail.current.style.display = "block";
            insert = false;
        } else inputEmail.current.style.display = "none";
        if (!textNumberValidate(password).status || password === undefined) {
            inputPassword.current.style.display = "block";
            insert = false;
        } else {
            inputPassword.current.style.display = "none";
        }

        if (insert) {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password })
            }
            try {
                let result = await fetch('/user', options);
                await result.json().then((res) => {
                    if (typeof res == "string") alert(res)
                    else if (typeof res == "object") {
                        dispatch(initUser(res));
                        let user = JSON.parse(localStorage.getItem('currentUser'));
                        if (user !== null) {
                            localStorage.removeItem('currentUser');
                        }
                        if (checkbox.current.checked) {
                            localStorage.setItem('currentUser', JSON.stringify(res));
                        }
                        close();
                    }
                })
            }
            catch {
                userExist.current.style.display = "block";
            }
        }
    }

    const create = () => {
        props.setCreate(true);
    }

    return (
        <div id="login1">
            <CloseIcon className='closeImg' onClick={() => close()} />
            <div className="login_topimg"></div>
            <div className="wrap-login100">
                <span className="login100-form-title"> Login </span>
                <span className="login100-form-subtitle m-b-16"> to your account </span>
                <div className="wrap-input100 validate-input m-b-16" >
                    <input className="input100" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <p ref={inputEmail} style={{ display: "none", color: "rgb(238, 85, 85)" }}>Please enter currect email</p>
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                        <span className="glyphicon glyphicon-user"></span>
                    </span>
                </div>
                <div className="wrap-input100 validate-input m-b-16">
                    <input className="input100" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <p ref={inputPassword} style={{ display: "none", color: "rgb(238, 85, 85)" }}>Please enter just number and letters</p>
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                        <span className="glyphicon glyphicon-lock"></span>
                    </span>
                </div>
                <div className="flex-sb-m w-full p-b-30">
                    <div className="contact100-form-checkbox">
                        <input ref={checkbox} className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                        <label className="label-checkbox100" htmlFor="ckb1">
                            Remember me
                        </label>
                    </div>
                </div>
                <div className="container-login100-form-btn p-t-25">
                    <p ref={userExist} style={{ display: "none", color: "rgb(238, 85, 85)" }}>User don't exist</p>
                    <button className="login100-form-btn" style={{ marginBottom: "20px" }} onClick={() => signIn()}> Login </button>
                    <button className="login100-form-btn" onClick={() => create()}> Create account </button>
                </div>
            </div>
        </div>

    )
}
