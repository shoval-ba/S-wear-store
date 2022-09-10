import {React , useState , createRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
    textValidate,
    numValidate,
    textNumberValidate,
    emailValidate,
  } from "react-validations-components";
import '../styles/CreateAccount.scss'
import bcrypt from 'bcryptjs'

export default function CreateAccount(props)  { 

    const newUser ={
        first_name:"",
        last_name:"",
        phone_number:0,
        city:"",
        adress:"",
        email:"",
        password:""
    }
    const [user , setUser] = useState(newUser);
    const [passwordAgain , setPassword] = useState("");
    const [insert , setInsert] = useState(true);

    const first_name = createRef();
    const last_name = createRef();
    const phone_number = createRef();
    const city = createRef();
    const adress = createRef();
    const email = createRef();
    const password = createRef();
    const inputPassword = createRef();

    const handleSubmit = async () => {
        setInsert(true)
        if(!textValidate(user.first_name).status || user.first_name == ""){
            setInsert(false)
            first_name.current.style.display = "block"
        } else first_name.current.style.display = "none"
        if(!textValidate(user.last_name).status || user.last_name == ""){
            setInsert(false)
            last_name.current.style.display = "block"
        } else last_name.current.style.display = "none"
        if(!emailValidate(user.email).status || user.email == ""){
            setInsert(false)
            email.current.style.display = "block"
        } else email.current.style.display = "none"
        if(!numValidate(user.phone_number).status || user.phone_number == 0){
            setInsert(false)
            phone_number.current.style.display = "block"
        } else phone_number.current.style.display = "none"
        if(!textValidate(user.city).status || user.city == ""){
            setInsert(false)
            city.current.style.display = "block"
        } else city.current.style.display = "none"
        if(!textNumberValidate(user.adress).status || user.adress == ""){
            setInsert(false)
            adress.current.style.display = "block"
        } else adress.current.style.display = "none"
        if(!textNumberValidate(user.password).status || user.password == ""){
            setInsert(false)
            password.current.style.display = "block"
        } else password.current.style.display = "none"
              
        if (passwordAgain !== user.password || passwordAgain == ""){
            setInsert(false);
            inputPassword.current.style.display = "block"
            return
        } else {
            inputPassword.current.style.display = "none"
            const hashedPassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
            user.password = hashedPassword
        }
        console.log(insert)
        if(insert == true){
            console.log(user)
            const options ={
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
              }
              try{
                let result = await fetch('/addUser', options);
                await result.json().then((res) => {
                    if(typeof res == "string") alert(res)
                    else if (typeof res == "object"){
                        props.setUser(res);
                        let user = JSON.parse(localStorage.getItem('currentUser'));
                        if(user !== null) {
                            localStorage.removeItem(user)
                        }
                        localStorage.setItem('currentUser' , JSON.stringify(res))
                        close()
                    }
                })
              }
              catch {
                alert("Can't insert")
              }
        }
    }

    const close = () => {
        props.sighIn(false)
    }

    return (
    
        <div className="container">
            <CloseIcon className='closeImg' onClick={()=>close()}/>
            <div className="row py-5 mt-4 align-items-center bigParts">
                <div className="col-md-5 pr-lg-5 mb-5 mb-md-0" style={{flexGrow:"1"}}>
                    <img src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg" alt="" className="img-fluid mb-3 d-none d-md-block"/>
                    <h1 style={{textAlign:"center"}}>Create an Account</h1>
                </div>
                <div className="col-md-7 col-lg-6 ml-auto" style={{marginLeft:"0" , flexGrow:"3"}}>
                    <form action="#" >
                        <div className="row">
                            <div className="input-group col-lg-6 mb-4 inputContainer">
                                <div className="input-group-prepend iconCreate">
                                    <span className="input-group-text bg-white px-4 border-md border-right-0">
                                        <i className="fa fa-user text-muted"></i>
                                    </span>
                                </div>
                                <input id="firstName" type="text" name="firstname" placeholder="First Name" 
                                className="inputCreate form-control bg-white border-left-0 border-md" onChange={(e)=>{setUser(previousState => {
                                                return { ...previousState, first_name: e.target.value }
                                            })}}/>
                                <p ref={first_name} style={{display:"none" , color:"rgb(238, 85, 85)"}}>First name have to be text</p>
                            </div>
                            <div className="input-group col-lg-6 mb-4 inputContainer">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white px-4 border-md border-right-0">
                                        <i className="fa fa-user text-muted"></i>
                                    </span>
                                </div>
                                <input id="lastName" type="text" name="lastname" placeholder="Last Name" 
                                className="inputCreate form-control bg-white border-left-0 border-md" onChange={(e)=>{setUser(previousState => {
                                                return { ...previousState, last_name: e.target.value }
                                            })}}/>
                                <p ref={last_name} style={{display:"none" , color:"rgb(238, 85, 85)"}}>Last name have to be text</p>
                            </div>
                            <div className="input-group col-lg-12 mb-4 inputContainer">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white px-4 border-md border-right-0">
                                        <i className="fa fa-envelope text-muted"></i>
                                    </span>
                                </div>
                                <input id="email" type="email" name="email" placeholder="Email Address" 
                                className="inputCreate form-control bg-white border-left-0 border-md" onChange={(e)=>{setUser(previousState => {
                                    return { ...previousState, email: e.target.value }
                                })}}/>
                                <p className="message" ref={email} style={{display:"none" , color:"rgb(238, 85, 85)"}}>Please enter currect email</p>
                            </div>

                            <div className="input-group col-lg-12 mb-4 inputContainer">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white px-4 border-md border-right-0">
                                        <i className="fa fa-phone-square text-muted"></i>
                                    </span>
                                </div>   
                                <input id="phoneNumber" type="tel" name="phone" placeholder="Phone Number" 
                                className="inputCreate form-control bg-white border-md border-left-0 pl-3" onChange={(e)=>{setUser(previousState => {
                                    return { ...previousState, phone_number: e.target.value }
                                })}}/>
                                <p className="message" ref={phone_number} style={{display:"none" , color:"rgb(238, 85, 85)"}}>Please enter currect phone number</p>
                            </div>
                            <div className="input-group col-lg-12 mb-4 inputContainer">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white px-4 border-md border-right-0">
                                        <i className="fa fa-globe fa-lg text-muted" aria-hidden="true"></i>
                                    </span>
                                </div>   
                                <input id="city" name="city" placeholder="City" 
                                className="inputCreate form-control bg-white border-md border-left-0 pl-3" onChange={(e)=>{setUser(previousState => {
                                    return { ...previousState, city: e.target.value }
                                })}}/>
                                <p className="message" ref={city} style={{display:"none" , color:"rgb(238, 85, 85)"}}>Please enter currect city</p>
                            </div>
                            <div className="input-group col-lg-12 mb-4 inputContainer">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white px-4 border-md border-right-0">
                                    <i className="fa fa-map-marker fa-lg text-muted" aria-hidden="true"></i>
                                    </span>
                                </div>   
                                <input id="adress" name="adress" placeholder="Adress" 
                                className="inputCreate form-control bg-white border-md border-left-0 pl-3" onChange={(e)=>{setUser(previousState => {
                                    return { ...previousState, adress: e.target.value }
                                })}}/>
                                <p className="message" ref={adress} style={{display:"none" , color:"rgb(238, 85, 85)"}}>Please enter currect adress</p>
                            </div>

                            <div className="input-group col-lg-6 mb-4 inputContainer">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white px-4 border-md border-right-0">
                                        <i className="fa fa-lock text-muted"></i>
                                    </span>
                                </div>
                                <input id="password" type="password" name="password" placeholder="Password" 
                                className="inputCreate form-control bg-white border-left-0 border-md" onChange={(e)=>{setUser(previousState => {
                                                return { ...previousState, password: e.target.value }
                                            })}}/>
                                    <p ref={password} style={{display:"none" , color:"rgb(238, 85, 85)"}}>Please enter just number and letters</p>
                            </div>
                            <div className="input-group col-lg-6 mb-4 inputContainer">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white px-4 border-md border-right-0">
                                        <i className="fa fa-lock text-muted"></i>
                                    </span>
                                </div>
                                <input id="passwordConfirmation" type="password" name="passwordConfirmation" placeholder="Confirm Password" 
                                className="inputCreate form-control bg-white border-left-0 border-md" onChange={(e)=>{setPassword(e.target.value)}}/>
                                <p ref={inputPassword} style={{display:"none" , color:"rgb(238, 85, 85)"}}>Passwords are not the same</p>
                            </div>

                            <div className="form-group col-lg-12 mx-auto mb-0">
                                <div className="buttonCreate btn btn-primary btn-block py-2" onClick={()=>{handleSubmit()}}>
                                    <span style={{fontSize:"20px"}} className="font-weight-bold">Create your account</span>
                                </div>
                            </div>
                            <div id="divHaveAcount">
                                <span style={{paddingRight: "25px"}}>Already have an account? </span> 
                                <span id="returnToSignIn" onClick={()=>props.setCreate(false)}>Sign Up</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
 