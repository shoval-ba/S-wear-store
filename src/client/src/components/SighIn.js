import {React , useState , useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/SighIn.scss'

export default function SighIn(props)  { 

    const [email , setEmail] = useState();
    const [password , setPassword] = useState();

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
            let result = await fetch('/user', options);
            await result.json().then((res) => {
                if(typeof res == "string") alert(res)
                else if (typeof res == "object"){
                    props.setUser(res);
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
        <div id="login">
            <CloseIcon className='closeImg' onClick={()=>close()}/>
            <div class="login_topimg"></div>
            <div class="wrap-login100">
                <form class="login100-form validate-form"> 
                    <span class="login100-form-title "> Login </span> 
                    <span class="login100-form-subtitle m-b-16"> to your account </span>
                    <div class="wrap-input100 validate-input m-b-16" data-validate="Valid email is required: ex@abc.xyz"> 
                        <input class="input100" type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/> 
                        <span class="focus-input100"></span> 
                        <span class="symbol-input100">
                            <span class="glyphicon glyphicon-user"></span> 
                        </span> 
                    </div>
                    <div class="wrap-input100 validate-input m-b-16" data-validate="Password is required"> 
                        <input class="input100" type="password" name="pass" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        <span class="focus-input100"></span> 
                        <span class="symbol-input100"> 
                            <span class="glyphicon glyphicon-lock"></span> 
                        </span> 
                    </div>
                    <div class="flex-sb-m w-full p-b-30">
                        <div class="contact100-form-checkbox">
                            <input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>
                            <label class="label-checkbox100" for="ckb1">
                                Remember me
                            </label>
                        </div>
                        <div>
                            <a href="#" class="txt1">
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                    <div class="container-login100-form-btn p-t-25"> 
                        <button class="login100-form-btn" style={{marginBottom:"20px"}} onClick={() => sighIn()}> Login </button> 
                        <button class="login100-form-btn" onClick={() => create()}> Create account </button> 
                    </div>
                </form>
            </div>
        </div>
    
    )
}
 