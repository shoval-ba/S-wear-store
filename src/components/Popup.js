import {React , useState , useEffect } from 'react';
import SighIn from './SighIn';
import CreateAccount from './createAccount';

export default function Popup(props)  { 

    const [createAccount , setCreate] = useState(false);

    return (
        <div className="popupContainer">       
                {createAccount ? <CreateAccount sighIn={props.sighIn}/> : <SighIn setCreate={setCreate} sighIn={props.sighIn}/>}
        </div>
    )
}
 