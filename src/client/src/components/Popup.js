import {React , useState , useEffect } from 'react';
import SighIn from './SighIn';
import CreateAccount from './createAccount';
import "../styles/Popup.scss"

export default function Popup(props)  { 

    const [createAccount , setCreate] = useState(false);

    return (
        <div className="popupContainer">       
                {createAccount ? <CreateAccount sighIn={props.sighIn} setUser={props.setUser} setCreate={setCreate}/> : <SighIn setCreate={setCreate} sighIn={props.sighIn} setUser={props.setUser}/>}
        </div>
    )
}
 