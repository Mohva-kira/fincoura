

import React from 'react'
import productImg from '../../assets/images/arm-chair-01.jpg'
import { motion } from 'framer-motion'
import { Col } from 'reactstrap'
import "../../styles/product-card.css"
import { Link } from 'react-router-dom'
import {  toast } from 'react-toastify'

import { useDispatch, useSelector } from "react-redux"
import { cartActions } from '../../reducers/cartSlice'
import util from '../../util'
import { useGetProductsImagesQuery } from '../../reducers/products'
const ProductCard = ({item}) => {


    const dataImages = useSelector((state) => state.products.items.included)


    const imageUrl = dataImages?.find(el => el.id === item.relationships.field_image.data[0].id)

    const dispatch = useDispatch();
    const addToCart = () => {
        dispatch(cartActions.addItem({
            id: item.id,
            productName: item.attributes.title,
            price: item.attributes.price.number,
            imgID: item.relationships.field_image.data[0].id,
            type: item.type
        }))

        toast.success('Product added successfully ')
    }
    return (
        <Col lg='3' md='4' className='mb-4' >
       
           
            <div className="product__item ">
                <div className="product__img">
                    <motion.img whileHover={{scale: 0.9}} src={`http://localhost:1337${item.attributes.image.data[0].attributes.url}`} alt="" />
                </div>
               <div className="p-2 product__info">
               <h3 className="product__name"><Link to={`/shop/${item.id}`}> {item.attributes.name} </Link></h3>
                <span>{item.category} </span>
               </div>
                <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
                    <span className="price">{util.formatCirrency( Number(item.attributes.price) ) }</span>
                    <motion.span whileTap={{scale: 1.2}}><i className="ri-add-line" onClick={addToCart}></i></motion.span>
                </div>
            </div>
        </Col>
    )
}

export default ProductCard 