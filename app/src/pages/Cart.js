import React from 'react'
import '../styles/cart.css'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Container, Row, Col } from "reactstrap"

import { motion } from 'framer-motion'
import { cartActions } from '../reducers/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useAddToCartMutation } from '../reducers/cartSlice'

import { Await, json, Link } from "react-router-dom"
import util from '../util'


const Cart = () => {
  
  

  
  const cartItems = useSelector(state => state.cart.cartItems)
  const totalAmount = useSelector(state => state.cart.totalAmount)
  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const [checkout] = useAddToCartMutation()
  
  const convertData = (array, key) => {
    const data = {};
    const newArr = []
    for (let item of array) {
       newArr.push({id: item.id ,type: item.type, meta: {quantity: item.quantity, combine: false}})
    }
    data.data = newArr
    localStorage.setItem('cartToken', Math.random().toString(36).substring(2))
    return data
  };
  const data = convertData(cartItems)
  
  const handleCheckout = async () => {
    const dataToSend = JSON.stringify(data)
    try {
      console.log(dataToSend)
      console.log("token", localStorage.getItem('access_token'))
     await checkout(dataToSend)
       .unwrap()
       .then((payload) =>{
         console.log('order payload', payload.data)
         localStorage.setItem('drupalOrder', JSON.stringify(payload.data) )
       })
       .catch((error) => console.log('rejected', error))
    } catch (error) {
      console.log(error.toString())
    }
    
  }

  return <Helmet title="Shopping cart">
    <CommonSection title="Shopping cart" />
    <section>
    
      <Container>
        {console.log(data)}
        <Row>
          <Col lg='9'>
            {
              cartItems.length === 0 ? (
                <h2 className='fs-4 text-center'>No item added to the cart</h2>
              ) : (
                <table className='table bordered'>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      cartItems.map((item, index) => (
                        <Tr item={item} key={index} />
                      ))
                    }
                  </tbody>
                </table>

              )
            }

          </Col>
          <Col lg='3'>
            <div>
              <h6 className='d-flex align-items-center justify-content-between'>Subtotal <span className='fs-4 fw-bold'>{util.formatCirrency(totalAmount)}</span></h6>

            </div>
            <p className='fs-6 mt-2'>taxes and shipping will calculate in checkout</p>
            <div>
              <Link onClick={()=>handleCheckout(data)} to='/checkout'>
                <button className="buy__btn w-100 ">
                  Checkout
                </button>
              </Link>
              <Link to='/shop'>
                <button className="buy__btn w-100 mt-3">
                  Continue Shopping
                </button>
              </Link> 
            </div>
          </Col>
        </Row>
      </Container>
    </section>

  </Helmet>
}

const Tr = ({ item }) => {
  const dataImages = useSelector((state) => state.products.items.included)
  const WS_KEY = 'ws_key=X62XX13PRJYYZQP7FZR663UK4S29D4A9'  
  const dispatch = useDispatch()

  const imageUrl = dataImages.find(el => el.id === item.imgID)
  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id))
  }
  return <tr >
   
    <td> <img src={`http://localhost${imageUrl?.attributes.uri.url}`} alt="" /> </td>
    <td> {item.productName}  </td>
    <td>  { util.formatCirrency(item.price) } </td>
    <td>{item.quantity}px</td>
    <td><motion.i whileTap={{ scale: 1.2 }} className="ri-delete-bin-line" onClick={deleteProduct}></motion.i></td>
  </tr>
}

export default Cart