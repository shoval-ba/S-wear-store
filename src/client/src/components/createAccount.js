import {React , useState , useEffect } from 'react';
import SighIn from './SighIn';
import '../styles/CreateAccount.scss'

export default function CreateAccount(props)  { 

    const newUser ={
        first_name:"",
        last_name:"",
        phone_number:0,
        city:"",
        adress:"",
        email:"",
        date_of_birth:new Date(),
        password:""
    }
    const [user , setUser] = useState(newUser);
    const [passwordAgain , setPassword] = useState("");
    const [insert , setInsert] = useState(true)

    const handleSubmit = async () => {
        console.log(user)
        if (passwordAgain !== user.password){
            setInsert(false);
            alert('the password are not the same');
            return
        } 
        for(let key in user){
            if(key == "phone_number" && user[key] == 0){
                console.log(key)
                setInsert(false);
                alert('You need to fill all the values');
                return
            } 
            if(key == "date_of_birth" && user[key] == new Date()){
                console.log(key)
                setInsert(false);
                alert('You need to fill all the values');
                return
            } 
            else if(user[key] == ""){
                setInsert(false);
                alert('You need to fill all the values');
                return
            }
        }

        if(insert == true){
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
                  alert(res)
                })
              }
              catch {
                alert("Can't insert")
              }
        }
    }

    const handleCancel = () => {
        const fun = props.sighIn
        fun(false)
    }

    return (
    //     <div className='app'>
    //         <div className='allInfo'>
    //     <h2>Basic information</h2>
    //     <form>
    //         <div className='basicInfo'>
    //             <div className='name'>
    //                 <div className='first'>
    //                     <label htmlFor='firstName'>FIRST NAME</label>
    //                     <input className="inputCreate" type="text" value={user.first_name} onChange={(e)=>{setUser(previousState => {
    //                                     return { ...previousState, first_name: e.target.value }
    //                                 })}}></input>
    //                 </div>
    //                 <div className='last'>               
    //                     <label htmlFor='lastName'>LAST NAME</label>
    //                     <input className="inputCreate"  type="text" value={user.last_name} onChange={(e)=>{setUser(previousState => {
    //                                     return { ...previousState, last_name: e.target.value }
    //                                 })}}></input>
    //                 </div>
    //             </div>
    //             <div>
    //                 <label htmlFor='phone_number'>PHONE NUMBER</label>
    //                 <input className="inputCreate" type="phone" value={user.phone_number} placeholder="Enter your phone number" onChange={(e)=>{setUser(previousState => {
    //                                     return { ...previousState, phone_number: e.target.value }
    //                                 })}}></input>
    //             </div>
    //             <div>
    //                 <label htmlFor='email'>EMAIL</label>
    //                 <input className="inputCreate" type="text" value={user.email} placeholder="Enter your email" onChange={(e)=>{setUser(previousState => {
    //                                     return { ...previousState, email: e.target.value }
    //                                 })}}></input>
    //             </div>
    //             <div>               
    //                 <label htmlFor='city'>CITY</label>
    //                 <input className="inputCreate" type="text" value={user.city} placeholder="Enter city" onChange={(e)=>{setUser(previousState => {
    //                                     return { ...previousState, city: e.target.value }
    //                                 })}}></input>
    //             </div>
    //             <div>
    //                 <label htmlFor='adress'>ADRESS</label>
    //                 <input className="inputCreate" type="text" value={user.adress} placeholder="Enter adress" onChange={(e)=>{setUser(previousState => {
    //                                     return { ...previousState, adress: e.target.value }
    //                                 })}}></input>
    //             </div>
    //             <div>
    //                 <label htmlFor='date_of_birth'>DATE OF BIRTH</label>
    //                 <input className="inputCreate" type="date" value={user.date_of_birth} placeholder="Enter bate of birth" onChange={(e)=>{setUser(previousState => {
    //                                     return { ...previousState, date_of_birth: e.target.value }
    //                                 })}}></input>
    //             </div>
    //             <div>
    //                 <label htmlFor='password'>PASSWORD</label>
    //                 <input className="inputCreate" type="password" value={user.password} placeholder="Enter password" onChange={(e)=>{setUser(previousState => {
    //                                     return { ...previousState, password: e.target.value }
    //                                 })}}></input>
    //             </div>
    //             <div>
    //                 <label htmlFor='password'>PASSWORD AGAIN</label>
    //                 <input className="inputCreate" type="password" value={passwordAgain} placeholder="Enter password again" onChange={(e)=>{setPassword(e.target.value)}}></input>
    //             </div>
    //         </div>
    //     </form>
    //     <div className='buttons'>
    //         <button className='buttonCancel' onClick={()=>{handleCancel()}}>cancel</button>
    //         <button className='buttonSave' onClick={()=>{handleSubmit()}}>save</button>
    //     </div>
    // </div>
    // </div>


<div className="container">
    <div className="row py-5 mt-4 align-items-center bigParts">
        <div className="col-md-5 pr-lg-5 mb-5 mb-md-0" style={{flexGrow:"1"}}>
            <img src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg" alt="" className="img-fluid mb-3 d-none d-md-block"/>
            <h1 style={{textAlign:"center"}}>Create an Account</h1>
        </div>
        <div className="col-md-7 col-lg-6 ml-auto" style={{marginLeft:"0" , flexGrow:"3"}}>
            <form action="#">
                <div className="row">
                    <div className="input-group col-lg-6 mb-4 inputContainer">
                        <div className="input-group-prepend iconCreate">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fa fa-user text-muted"></i>
                            </span>
                        </div>
                        <input id="firstName" type="text" name="firstname" placeholder="First Name" className="inputCreate form-control bg-white border-left-0 border-md"/>
                    </div>
                    <div className="input-group col-lg-6 mb-4 inputContainer">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fa fa-user text-muted"></i>
                            </span>
                        </div>
                        <input id="lastName" type="text" name="lastname" placeholder="Last Name" className="inputCreate form-control bg-white border-left-0 border-md"/>
                    </div>
                    <div className="input-group col-lg-12 mb-4 inputContainer">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fa fa-envelope text-muted"></i>
                            </span>
                        </div>
                        <input id="email" type="email" name="email" placeholder="Email Address" className="inputCreate form-control bg-white border-left-0 border-md"/>
                    </div>

                    <div className="input-group col-lg-12 mb-4 inputContainer">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fa fa-phone-square text-muted"></i>
                            </span>
                        </div>   
                        <input id="phoneNumber" type="tel" name="phone" placeholder="Phone Number" className="inputCreate form-control bg-white border-md border-left-0 pl-3"/>
                    </div>
                    <div className="input-group col-lg-12 mb-4 inputContainer">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fa fa-globe fa-lg text-muted" aria-hidden="true"></i>
                            </span>
                        </div>   
                        <input id="city" name="city" placeholder="City" className="inputCreate form-control bg-white border-md border-left-0 pl-3"/>
                    </div>
                    <div className="input-group col-lg-12 mb-4 inputContainer">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                            <i className="fa fa-map-marker fa-lg text-muted" aria-hidden="true"></i>
                            </span>
                        </div>   
                        <input id="adress" name="adress" placeholder="Adress" className="inputCreate form-control bg-white border-md border-left-0 pl-3"/>
                    </div>

                    <div className="input-group col-lg-6 mb-4 inputContainer">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fa fa-lock text-muted"></i>
                            </span>
                        </div>
                        <input id="password" type="password" name="password" placeholder="Password" className="inputCreate form-control bg-white border-left-0 border-md"/>
                    </div>
                    <div className="input-group col-lg-6 mb-4 inputContainer">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white px-4 border-md border-right-0">
                                <i className="fa fa-lock text-muted"></i>
                            </span>
                        </div>
                        <input id="passwordConfirmation" type="text" name="passwordConfirmation" placeholder="Confirm Password" className="inputCreate form-control bg-white border-left-0 border-md"/>
                    </div>

                    <div className="form-group col-lg-12 mx-auto mb-0">
                        <div className="buttonCreate btn btn-primary btn-block py-2">
                            <span style={{fontSize:"20px"}} className="font-weight-bold">Create your account</span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

    )
}
 