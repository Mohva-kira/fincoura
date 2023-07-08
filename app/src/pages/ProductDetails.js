import React, { useState, useRef, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useParams } from 'react-router'
// import products from '../assets/data/products'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import '../styles/product-details.css'
import { motion } from 'framer-motion'
import ProductList from '../components/UI/ProductList'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '../reducers/cartSlice'
import { toast } from 'react-toastify'
import { current } from '@reduxjs/toolkit'
import util from '../util'
const ProductDetails = () => {

  const [tab, setTab] = useState('desc')
  const reviewUser = useRef('')
  const reviewMsg = useRef('')
  const dispatch = useDispatch()

  
  const dataImages = useSelector((state) => state.products.items.included)
  const [rating, setRating] = useState(null)
  const { id } = useParams()
  const products = useSelector(state => state.products.items.data)
  const product = products.find(item => item.id == id)

  const WS_KEY = 'ws_key=X62XX13PRJYYZQP7FZR663UK4S29D4A9'
  
   const { attributes, reviews, description, category } = product



  const relatedProducts = products.filter(item => item.attributes.category.data.attributes.name === 'Vêtements')

  const submitHandler= (e) => {
    e.preventDefault()
    const reviewUserName = reviewUser.current.value
    const reviewUserMsg = reviewMsg.current.value

     const reviewObj = {
      author: reviewUserName,
      text : reviewUserMsg,
      rating
     }
     console.log(reviewObj)
     toast.success('Review submitted')
  }

  const addToCart = () => {
    dispatch(cartActions.addItem({
      id,
      imgID: attributes?.image.data[0].url,
      producName: attributes.name,
      price: attributes.prices, 
    }))

    toast.success('Product added successfully')
  }


  useEffect(()=> {
    window.scrollTo(0,0)
  }, [product])
 useEffect(()=> {
  console.log('youhouuu')
 })
  return <Helmet title={attributes.name}>
    <CommonSection title={attributes.name} />
    {console.log('le produit',product)}
    <section className='pt-0'>
      <Container>
        <Row>
          <Col lg='6'><img src={`http://141.94.204.155:1337${attributes.image.data[0].attributes.url}`} alt="" /></Col>

          <Col lg='6'>
            <div className="product__details">
              <h2>{product?.attributes.name}</h2>
              <div className="product__rating d-flex align-items-center gap-5 mb-3">
                <div>
                  <span><i className="ri-star-s-fill"></i></span>
                  <span><i className="ri-star-s-fill"></i></span>
                  <span><i className="ri-star-s-fill"></i></span>
                  <span><i className="ri-star-s-fill"></i></span>
                  <span><i className="ri-star-half-s-line"></i></span>

                </div>
                <p className='mb-0'>(<span>{'4.5'}</span>ratings)</p>
              </div>
              <div className='d-flex align-items-center gap-5'>
                <span className='proudct__price'>{util.formatCirrency(attributes.price)}</span>
                <span>Category : {attributes.category.data.attributes.name}</span>
              </div>
              <p className='mt-3'> {attributes.description} </p>
              <motion.button whileTap={{ scale: 1.2 }} className="buy__btn" onClick={addToCart}> Add to Cart </motion.button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>

    <section>
      <Container>
        <Row>
          <Col lg="12">
            <div className="tab__wrapper d-flex align-items-center gap-5">
              <h6 className={`${tab === 'desc' ? 'active__tab' : ''}`} onClick={() => setTab('desc')}>Description</h6>
              <h6 className={`${tab === 'rev' ? 'active__tab' : ''}`} onClick={() => setTab('rev')}>Reviews ({"3"})</h6>
            </div>

            {
              tab === 'desc' ?
                <div className="tab__content mt-6">
                  <p>{'description'}</p>
                </div> : (<div className='product__review mt-5'>
                  <div className="review__wrapper">
                    <ul>
                      <li>
                        youhou
                      </li>
                      
                    </ul>

                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <form action="" onSubmit={submitHandler}>
                        <div className="form__group">
                          <input type="text" placeholder='Enter name' ref={reviewUser} required/>
                        </div>

                        <div className="form__group d-flex align-items-center gap-lg-5 rating__group">
                          <motion.span whileTap={{scale:1.2}} onClick={() => setRating(1)}>1<i className="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{scale:1.2}} onClick={() => setRating(2)}>2<i className="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{scale:1.2}} onClick={() => setRating(3)}>3<i className="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{scale:1.2}} onClick={() => setRating(4)}> 4<i className="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{scale:1.2}} onClick={() => setRating(5)}>5<i className="ri-star-s-fill"></i></motion.span>
                        </div>

                        <div className="form__group">
                          <textarea rows={4} type="text" placeholder='Review Message ...' ref={reviewMsg} required />
                        </div>

                        <motion.button whileTap={{scale:1.2}} type="submit" className="buy__btn">submit</motion.button>
                      </form>
                    </div>
                  </div>
                </div>)
            }
          </Col>
          <Col lg='12' className='mt-5'>
            <h2 className="related__title">You might also like</h2>
          </Col>

          <ProductList data={relatedProducts} />
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default ProductDetails