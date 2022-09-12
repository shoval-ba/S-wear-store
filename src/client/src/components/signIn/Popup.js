import {React , useState } from 'react';
import SignIn from './SignIn';
import CreateAccount from './createAccount';
import "../../styles/Popup.moudle.scss"

export default function Popup(props)  { 

    const [createAccount , setCreate] = useState(false);

    return (
        <div className="popupContainer">       
            {createAccount ? <CreateAccount signIn={props.signIn} setUser={props.setUser} setCreate={setCreate}/> : 
            <SignIn setCreate={setCreate} signIn={props.signIn} setUser={props.setUser} setMyBag={props.setMyBag}/>}
        </div>
    )
}
 