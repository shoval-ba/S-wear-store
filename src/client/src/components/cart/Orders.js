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
    },[orders])

    let itemsUi = orders.map((item)=>{
        return(
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
        <div >
            <CCard className='ordersDiv'>
            <h3 style={{marginBottom:"0px"}}>Orders ({orders.length})</h3>
            <h4 style={{borderBottom:"1px solid black" , paddingBottom:"5px"}}>Total price: {totalPrice}$</h4>
                {itemsUi}
            </CCard>
        </div>
    );
  }