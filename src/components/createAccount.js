import {React , useState , useEffect } from 'react';
import SighIn from './SighIn';

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
                let result = await fetch('https://clothes-app-shoval.herokuapp.com/addUser', options);
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
        <div className='app'>
            <div className='allInfo'>
        <h2>Basic information</h2>
        <form>
            <div className='basicInfo'>
                <div className='name'>
                    <div className='first'>
                        <label htmlFor='firstName'>FIRST NAME</label>
                        <input type="text" value={user.first_name} onChange={(e)=>{setUser(previousState => {
                                        return { ...previousState, first_name: e.target.value }
                                    })}}></input>
                    </div>
                    <div className='last'>               
                        <label htmlFor='lastName'>LAST NAME</label>
                        <input type="text" value={user.last_name} onChange={(e)=>{setUser(previousState => {
                                        return { ...previousState, last_name: e.target.value }
                                    })}}></input>
                    </div>
                </div>
                <div>
                    <label htmlFor='phone_number'>PHONE NUMBER</label>
                    <input type="phone" value={user.phone_number} placeholder="Enter your phone number" onChange={(e)=>{setUser(previousState => {
                                        return { ...previousState, phone_number: e.target.value }
                                    })}}></input>
                </div>
                <div>
                    <label htmlFor='email'>EMAIL</label>
                    <input type="text" value={user.email} placeholder="Enter your email" onChange={(e)=>{setUser(previousState => {
                                        return { ...previousState, email: e.target.value }
                                    })}}></input>
                </div>
                <div>               
                    <label htmlFor='city'>CITY</label>
                    <input type="text" value={user.city} placeholder="Enter city" onChange={(e)=>{setUser(previousState => {
                                        return { ...previousState, city: e.target.value }
                                    })}}></input>
                </div>
                <div>
                    <label htmlFor='adress'>ADRESS</label>
                    <input type="text" value={user.adress} placeholder="Enter adress" onChange={(e)=>{setUser(previousState => {
                                        return { ...previousState, adress: e.target.value }
                                    })}}></input>
                </div>
                <div>
                    <label htmlFor='date_of_birth'>DATE OF BIRTH</label>
                    <input type="date" value={user.date_of_birth} placeholder="Enter bate of birth" onChange={(e)=>{setUser(previousState => {
                                        return { ...previousState, date_of_birth: e.target.value }
                                    })}}></input>
                </div>
                <div>
                    <label htmlFor='password'>PASSWORD</label>
                    <input type="password" value={user.password} placeholder="Enter password" onChange={(e)=>{setUser(previousState => {
                                        return { ...previousState, password: e.target.value }
                                    })}}></input>
                </div>
                <div>
                    <label htmlFor='password'>PASSWORD AGAIN</label>
                    <input type="password" value={passwordAgain} placeholder="Enter password again" onChange={(e)=>{setPassword(e.target.value)}}></input>
                </div>
            </div>
        </form>
        <div className='buttons'>
            <button className='buttonCancel' onClick={()=>{handleCancel()}}>cancel</button>
            <button className='buttonSave' onClick={()=>{handleSubmit()}}>save</button>
        </div>
    </div>
    </div>
    )
}
 