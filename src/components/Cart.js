import {React , useState , useEffect , createRef} from 'react';
import '../styles/Cart.scss'
import {  useOutletContext} from 'react-router-dom';

export default function Cart()  { 
   
    const myBag = useOutletContext()[1];
    {console.log(myBag)}
    return (
        <div>
           
        </div>
    )
}