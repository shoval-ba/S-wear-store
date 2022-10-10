import {React , useState } from 'react';
import SignIn from './SignIn';
import CreateAccount from './createAccount';
import "../../styles/Popup.moudle.scss"

export default function Popup()  { 

    const [createAccount , setCreate] = useState(false);

    return (
        <div className="popupContainer">       
            {createAccount ? <CreateAccount  setCreate={setCreate}/> : 
            <SignIn setCreate={setCreate} />}
        </div>
    )
}
 