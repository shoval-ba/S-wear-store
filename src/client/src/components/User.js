import {React , useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import "../styles/LittleCart.scss"

export default function User(props)  { 

        const currentUser = props.currentUser;

        let userUi ;
        if(currentUser === null ){
            userUi = (
                <div>
                    <p onClick={()=>props.sighIn(true)}>SighIn</p>
                </div>
            )
        }
    
        else { 
            userUi = (
                    <div>
                        <p>{currentUser.email}</p>
                    </div>
             )
            
        }

    return(
            <div onMouseLeave={() => props.setHover(false)} >
                <div className="shopping-cart" style={{right:"0px" , width:"200px"}}>
                    {userUi}
                </div>
            </div>
        
    )
 }
