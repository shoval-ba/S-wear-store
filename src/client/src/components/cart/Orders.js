import { React , useState } from 'react'
import {  useOutletContext } from 'react-router-dom';
import {
    CCard,
    CCardImage,
    CCol,
    CRow,
    CCardBody,
    CCardText,
    CCardTitle,
} from "@coreui/bootstrap-react";
import '../../styles/Orders.moudle.scss'
import { useEffect } from 'react';

  export default function Orders() {
    const orders = useOutletContext().orders;
    const [totalPrice , setPrice] = useState(0)

    useEffect(()=>{
        let price = 0;
        for(let item of orders){
            price += item.cloth.price * item.quantity;
        }
        setPrice(price)
        console.log(price)
    },[orders])

    let itemsUi = orders.map((item)=>{
        return(
            // <div className='order' key={item.cloth.cloth_id}>
            //     <div >
            //     <img id="imgOrder" src={item.cloth.img}/>
            //     </div>
            //     <div>
            //         <h3>{item.cloth.title}</h3>
            //         <p>Size: {item.size}</p>
            //         <p>Quantity: {item.quantity}</p>
            //     </div>
            //     <div>{item.cloth.price}</div>
            // </div>
            <CCard className="mb-3" key={item.cloth.cloth_id}>
            <CRow className="g-0">
              <CCol md={4}>
                <CCardImage src={item.cloth.img} />
              </CCol>
              <CCol md={8}>
                <CCardBody>
                  <CCardTitle>{item.cloth.title}</CCardTitle>
                  <CCardText>Size: {item.size}</CCardText>
                  <CCardText>Quantity: {item.quantity}</CCardText>
                </CCardBody>
                  <CCardText id="orderPrice">{item.cloth.price}$</CCardText>      
              </CCol>
            </CRow>
          </CCard>
        )
    })
    return (
        <div className='ordersDiv'>
            <div style={{display:"inline"}}>
            <h3 style={{marginBottom:"0px"}}>Number of items :{orders.length}</h3>
            <h4>Total price: {totalPrice}$</h4>
            </div>
            <div id="orders">
                {itemsUi}
            </div>
        </div>
    );
  }