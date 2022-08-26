import {React , useState , useEffect } from 'react';

export default function SighIn(props)  { 

    const [email , setEmail] = useState();
    const [password , setPassword] = useState();
    const[currentUser , setUser] = useState();

    const close = () => {
        const fun = props.sighIn
        fun(false)
    }

    const sighIn = async () => {
        const options ={
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:email, password:password})
          }
          try{
            let result = await fetch('https://clothes-app-shoval.herokuapp.com/user', options);
            await result.json().then((res) => {
                if(typeof res == "string") alert(res)
                else if (typeof res == "object"){
                    currentUser = res;
                    console.log(currentUser)
                }
            })
          }
          catch {
            alert("don't have user")
          }
    }

    const create = () => {
        props.setCreate(true)
    }

    return (
        <div className='popup'>
                <div className="headerPopup">
                    <h1 className="signInTitle"> Sign In</h1>
                    <img className="close" onClick={() => close()} src="https://d29fhpw069ctt2.cloudfront.net/icon/image/39219/preview.png" alt="Snow"/>
                </div>
                <div className="inputs">
                    <input className="inputSignIn" type="email" placeholder="Email address" onChange={(e) => setEmail(e.target.value)}/>
                    <input className="inputSignIn" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="signInButtons">
                    <button className="createAccountButton" onClick={() => create()}>CREATE AN ACCOUNT</button>
                    <button className="sighInButton" onClick={() => sighIn()}>SIGN IN</button>
                </div>
        </div>
    )
}
 