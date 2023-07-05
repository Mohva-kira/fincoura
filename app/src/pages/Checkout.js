import React, { useState } from 'react'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import '../styles/checkout.css'
import { useSelector } from 'react-redux'
import { useCheckoutOrderMutation, usePlaceOrderQuery } from '../reducers/cartSlice'
import  '../assets/js/cinetPay.js'

const Checkout = () => {
  const totalQty = useSelector(state=> state.cart.totalQuantity)
  const totalAmount = useSelector(state=> state.cart.totalAmount)

  const drupalCart = useSelector(state => state.cart.drupalCart)

  const orderId = drupalCart[0]?.relationships?.order_id?.data.id

  const [checkoutOrder] = useCheckoutOrderMutation()
  const getDataBody = () =>  {
    const data = {}

   

    return {data: {"type": "order--default", "id": orderId, "attributes": {"payment_instrument": {"payment_gateway_id": "stripejs" } }}}
}

const bodyData = getDataBody()

const checkoutInfo = {orderId: orderId, bodyData: JSON.stringify(bodyData)}

const [skip, setSkip] = useState(true)
  // const {data, isLoading, isFetching, isSuccess, isError} = usePlaceOrderQuery(orderId, bodyData, {skip} )

  


  const placeOrder = () =>  {

    setSkip(false)
    
    try {
     
      checkoutOrder(checkoutInfo)
      .unwrap()
      .then((payload) => {
          console.log('checkout payload', payload)
      })
      .catch((error) => console.log('rejected', error))
      
      CinetPay.setConfig({
        apikey: '74673491863c2850267ef47.72040759',//   YOUR APIKEY
        site_id: 'Fincoura',//YOUR_SITE_ID
        notify_url: 'http://localhost:3000/checkoutComplete/',
        mode: 'SANDBOX'
    })

    CinetPay.getCheckout({
      transaction_id: Math.floor(Math.random() * 100000000).toString(),
      amount: totalAmount,
      currency: 'XOF',
      channels: 'ALL',
      description: 'Test de paiement',   
       //Fournir ces variables pour le paiements par carte bancaire
      customer_name:"Joe",//Le nom du client
      customer_surname:"Down",//Le prenom du client
      customer_email: "down@test.com",//l'email du client
      customer_phone_number: "088767611",//l'email du client
      customer_address : "BP 0024",//addresse du client
      customer_city: "Antananarivo",// La ville du client
      customer_country : "CM",// le code ISO du pays
      customer_state : "CM",// le code ISO l'état
      customer_zip_code : "06510", // code postal

  })
  CinetPay.waitResponse(function(data) {
    if (data.status == "REFUSED") {
        if (alert("Votre paiement a échoué")) {
            window.location.reload();
        }
    } else if (data.status == "ACCEPTED") {
        if (alert("Votre paiement a été effectué avec succès")) {
            window.location.reload();
        }
    }
})
CinetPay.onError(function(data) {
    console.log(data);
})
    } catch (error) {
       console.log(error.toString())
    }
    
  
  }

  return <Helmet title='Checkout'> 
    <CommonSection  title="Checkout" />
    {console.log('drupal order', drupalCart)}
   
    <section>
      <Container>
      {console.log('order id', orderId) }
        <Row>
          <Col lg='8'>
            <h6 className="mb-4 fw-bold">Billing Information</h6>
            <Form className='billing__form'>
              <FormGroup className='form__group'>
                <input type="text" placeholder='Enter your name' />
              </FormGroup>
              
              <FormGroup className='form__group'>
                <input type="email" placeholder='Enter your email' />
              </FormGroup>

              <FormGroup className='form__group'>
                <input type="number" placeholder='Phone number' />
              </FormGroup>

              <FormGroup className='form__group'>
                <input type="text" placeholder='Street address' />
              </FormGroup>

              <FormGroup className='form__group'>
                <input type="text" placeholder='city' />
              </FormGroup>

              <FormGroup className='form__group'>
                <input type="text" placeholder='Postal code' />
              </FormGroup>

              <FormGroup className='form__group'>
                <input type="text" placeholder='Country' />
              </FormGroup>
            </Form>
          </Col>
          <Col lg="4">
            <div className="checkout__cart">
              <h6>Total Qty: <span> {totalQty} items </span></h6>
              <h6>Subtotal: <span> {totalAmount} €</span></h6>
              <h6> <span>Shipping: <br/> free shipping </span>  <span>0€</span></h6>
             
              <h4>Total Cost : <span> {totalAmount}€</span></h4>
              <button onClick={() => placeOrder()} className="buy__btn auth__btn w-100">Place an order</button>
            </div>
            
          </Col>
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Checkout