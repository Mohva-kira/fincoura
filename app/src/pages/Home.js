import React, { useEffect, useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'
import heroImage from '../assets/images/hero.png'
import '../styles/home.css'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Services from '../services/Services'
import ProductList from '../components/UI/ProductList'
import products from '../assets/data/products'
import counterImg from '../assets/images/femme.png'
import Clock from '../components/UI/Clock'
import { useGetProductsQuery } from '../reducers/products'
import { useTranslation } from 'react-i18next'

const Home = () => {

  const {t, i18n} = useTranslation()
  const {data, isLoading, isSuccess} = useGetProductsQuery({})

  const [trendingProduct, setTrendingProduct] = useState([])
  const [bestSalesProducts, setBestSalesProducts] = useState([])
  const [mobileProducts, setMobileProducts] = useState([])
  const [wirelessProducts, setWirelessProducts] = useState([])
  const [popularProducts, setPopularProducts] = useState([])

  const year = new Date().getFullYear()

  useEffect(() => {
    const naturalProducts = data?.data.filter(item => item.attributes.category.data.attributes.name === "Vêtements")
    const filteredTrendingProducts = naturalProducts?.slice( 0, 4)

    const tranformedProducts = data?.data.filter(item => item.attributes.category.data.attributes.name === "linge de maison")
    const filteredBestSalesProducts = tranformedProducts?.slice(Math.max(tranformedProducts.length - 4, 0))

    const newArrival = data?.data
    const filteredMobileProducts = newArrival?.slice(Math.max(newArrival.length - 4, 0))

    const filteredWirelessProducts = data?.data.filter(item => item.attributes.field_categories === '4')

    const popular = data?.data
  const filteredPopularProducts = popular?.slice(4, 8)

    setTrendingProduct(filteredTrendingProducts)
    setBestSalesProducts(filteredBestSalesProducts)
    setMobileProducts(filteredMobileProducts)
    setWirelessProducts(filteredWirelessProducts)
    setPopularProducts(filteredPopularProducts)

    

  }, [isSuccess])

  


  return <Helmet title={"Home"}>

    {console.log('data', trendingProduct)}
    <section className="hero__section">
  
      <Container>
        <Row>
          <Col lg='6' md='6'>
            <div className="hero__content">
              <p className="hero_subtitle uppercase">
               { t('Trending products') }  {year}
              </p>
              <h2>
                Les produits d'ici et d'ailleurs!
              </h2>
              <p>
                Explorez le monde depuis votre maison avec notre boutique de design
              </p>
              <motion.button whileTap={{ scale: 1.2 }} className='buy__btn'> <Link to='/shop' >SHOP NOW</Link>  </motion.button>
            </div>
          </Col>
          <Col lg='6' mg="6">
            <div className="hero__img">
              <img src={heroImage} alt="femme" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    <Services />
    <section className="trending__products">
      <Container>
        <Row>
          <Col lg='12' className='text-center mb-4'>
            <h2 className="section__title">Trending Products</h2>

          </Col>
          <ProductList data={trendingProduct} />
        </Row>
      </Container>
    </section>
    <section className="best__sales">
      <Container>
        <Row>
          <Col lg='12' className='text-center'>
            <h2 className="section__title">Best Sales</h2>

          </Col>
          <ProductList data={bestSalesProducts}/>
         
        </Row>
      </Container>
    </section>

    <section className="timer__count">
      <Container>
        <Row>
          <Col lg='6' md='12' className='count__down-col'>

            <div className="clock__top-content">
              <h4 className='text-white fs-6 mb-2'>Limited Offer</h4>
              <h3 className='text-white fs-5 mb-3'>Quality Armchair</h3>
            </div>
            <Clock />
            <motion.button whileTap={{scale: 1.2}} className="buy__btn store__btn">
              <Link to='/shop'> Visit Store </Link>
            </motion.button>
          </Col>
          <Col lg='6' md='12' className='text-end counter__img'>
            <img src={counterImg} alt="" />
          </Col>
        </Row>
      </Container>
    </section>
    <section className="new__arrivals">
      <Container>
        <Row>
          <Col lg='12' className='text-center'>
            <h2 className='section__title'> New Arrivals </h2>
          </Col>
          <ProductList data={mobileProducts} />
          <ProductList data={wirelessProducts} />
        </Row>
      </Container>
    </section>
    <section className="popular__category">
    <Container>
        <Row>
          <Col lg='12' className='text-center'>
            <h2 className='section__title'> Popular in Category </h2>
          </Col>
          <ProductList data={popularProducts} />
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Home