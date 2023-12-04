import React, { useState } from 'react'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import '../styles/checkout.css'
import { useSelector } from 'react-redux'
import { useCheckoutOrderMutation, usePlaceOrderQuery } from '../reducers/cartSlice'
import  '../assets/js/cinetPay.js'
import { useGetTokenMutation } from '../reducers/payment.js'

const Checkout = () => {
  const totalQty = useSelector(state=> state.cart.totalQuantity)
  const totalAmount = useSelector(state=> state.cart.totalAmount)

  const drupalCart = useSelector(state => state.cart.drupalCart)

  const orderId = drupalCart[0]?.relationships?.order_id?.data.id

  const [getToken] = useGetTokenMutation()

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
     
      getToken()
      .unwrap()
      .then((payload) => {
          console.log('checkout payload', payload)
      })
      .catch((error) => console.log('rejected', error))
    } catch (error) {
       console.log(error.toString())
    }
    
  
  }

  return <Helmet title='Paiement'> 
    <CommonSection  title="Paiement" />

   
    <section>
      <Container>
   
        <Row>
          <Col lg='8'>
            <h6 className="mb-4 fw-bold">Information de facturation</h6>
            <Form className='billing__form'>
              <FormGroup className='form__group'>
                <input type="text" placeholder='Nom et prenom' />
              </FormGroup>
              
              <FormGroup className='form__group'>
                <input type="email" placeholder='Entrer vôtre email' />
              </FormGroup>

              <FormGroup className='form__group'>
                <input type="number" placeholder='Numero de téléphone' />
              </FormGroup>

              <FormGroup className='form__group'>
                <input type="text" placeholder='Adresse' />
              </FormGroup>

              <FormGroup className='form__group'>
                <input type="text" placeholder='Ville' />
              </FormGroup>

              <FormGroup className='form__group'>
                <input type="text" placeholder='Code Postal' />
              </FormGroup>

              <FormGroup className='form__group'>
                <input type="text" placeholder='Pays' />
              </FormGroup>
            </Form>
          </Col>
          <Col lg="4">
            <div className="checkout__cart">
              <h6>Total Qte: <span> {totalQty} articles </span></h6>
              <h6>Sous Total: <span> {totalAmount} €</span></h6>
              <h6> <span>Livraison: <br/> Gratuite </span>  <span>0€</span></h6>
             
              <h4>Coût Total: <span> {totalAmount}€</span></h4>
              <button onClick={() => placeOrder()} className="buy__btn auth__btn w-100">Payer</button>
            </div>
            
          </Col>
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Checkout