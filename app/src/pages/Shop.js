import React, {useState, useEffect} from 'react'
import CommonSection from '../components/UI/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'
import '../styles/shop.css'

// import products from '../assets/data/products'
import ProductList from '../components/UI/ProductList'
import { useGetProductsQuery } from '../reducers/products'
import { useSelector } from 'react-redux'

const Shop = () => {
  const {data, isLoading, isSuccess} = useGetProductsQuery()
  

  const [ productsData, setProductsData ] = useState()

  const handleFilter = e=> {

    const filterValue = e.target.value
    if(filterValue==='frais'){
      const filteredProducts = data.data.filter(item => item.attributes.field_categories === '1' )
      
      setProductsData(filteredProducts)
      
    }

    if(filterValue==='transformé'){
      const filteredProducts = data.data.filter(item => item.attributes.field_categories === '2' )
      
      setProductsData(filteredProducts)

    }

    if(filterValue==='watch'){
      const filteredProducts = products.filter(item => item.category === 'watch' )
      
      setProductsData(filteredProducts)

    }
    if(filterValue==='chair'){
      const filteredProducts = products.filter(item => item.category === 'chair' )
      
      setProductsData(filteredProducts)

    }
    if(filterValue==='wireless'){
      const filteredProducts = products.filter(item => item.category === 'wireless' )
      
      setProductsData(filteredProducts)

    }
  }

  const handleSearch = e=> {
    const searchTerm = e.target.value 

    const searchedProducts = data.data.filter(item => item.attributes.title.toLowerCase().includes(searchTerm.toLowerCase()))
    setProductsData(searchedProducts)
  }


  useEffect(()=> {
    setProductsData(data?.data)
  }, [isSuccess])

  return <Helmet title="Shop"> 
      <CommonSection  title="Products" />
      {console.log(productsData)}
      <section>
        <Container>
          <Row>
            <Col lg='3' md='6'>
              <div className="filter__widget">
                 <select onChange={handleFilter}>
                  <option > Filter By Category</option>
                  <option value="frais" >Frais</option>
                  <option value="transformé">Transformé</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                 </select>
              </div>
            </Col>
            <Col lg='3' md='6' className='text-end'>
            <div className="filter__widget" >
                 <select >
                  <option > Sort By</option>
                  <option value="ascending" >Ascending</option>
                  <option value="descending">Descending</option>
               
                 </select>
              </div>
            </Col>
            <Col lg='6' md='12'>
              <div className="search__box">
                <input type="text" placeholder='search.....' onChange={handleSearch} />
                <span><i className="ri-search-line"></i></span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className='pt-0'> 
        <Container>
          <Row>
            { 
             isLoading ? <h4>Loading...</h4> :
             productsData?.length ===0 ? (<h1 className='text-center fs-4'>No Products found!</h1>) : 
              (<ProductList data={productsData} /> )
            }
          </Row>
        </Container>
      </section>
  </Helmet>
}

export default Shop