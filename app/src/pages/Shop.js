import React, {useState, useEffect} from 'react'
import CommonSection from '../components/UI/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'
import '../styles/shop.css'

// import products from '../assets/data/products'
import ProductList from '../components/UI/ProductList'
import { useGetProductsQuery } from '../reducers/products'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const Shop = () => {
  const {data, isLoading, isSuccess} = useGetProductsQuery()
  
  const [searchParams, setSearchParams] = useSearchParams();
   console.log('le param', searchParams.get("category")) 
 
  
   const categoryParam =   searchParams.get("category")
   const [ productsData, setProductsData ] = useState()

  const handleFilter = e=> {

    const filterValue = e.target.value
    if(filterValue==='Vêtements'){
      const filteredProducts = data.data.filter(item => item.attributes.category.data.attributes.name === 'Vêtements' )
      
      setProductsData(filteredProducts)
      
    }

    if(filterValue==='linge de maison'){
      const filteredProducts = data.data.filter(item => item.attributes.category.data.attributes.name === 'linge de maison' )
      
      setProductsData(filteredProducts)

    }

    if(filterValue==='Accesoires'){
      const filteredProducts = data.data.filter(item => item.attributes.category.data.attributes.name === 'Accesoires' )
      
      setProductsData(filteredProducts)

    }
    if(filterValue==='Cosmétiques'){
      const filteredProducts = data.data.filter(item => item.attributes.category === 'Cosmétiques' )
      
      setProductsData(filteredProducts)

    }
  
  }

  const handleSearch = e=> {
    const searchTerm = e.target.value 

    const searchedProducts = data.data.filter(item => item.attributes.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setProductsData(searchedProducts)
  }


  useEffect(()=> {
  categoryParam ? setProductsData(data?.data.filter(item => item.attributes.category.data.attributes.name === categoryParam )) : setProductsData(data?.data)
  }, [isSuccess, categoryParam])

  return <Helmet title="Shop"> 
      <CommonSection  title={categoryParam} />
      {console.log(productsData)}
      <section>
        <Container>
          <Row>
            <Col lg='3' md='6'>
              <div className="filter__widget">
                 <select onChange={handleFilter}>
                  <option > Filtrer par Category</option>
                  <option value="Vêtements" >Vêtements</option>
                  <option value="linge de maison">Linge de maison</option>
                  <option value="Accessoires">Accessoires</option>
                  <option value="Cosmétiques">Cosmétiques</option>
                 
                 </select>
              </div>
            </Col>
            <Col lg='3' md='6' className='text-end'>
            <div className="filter__widget" >
                 <select >
                  <option > Trier par </option>
                  <option value="ascending" >Ascendent</option>
                  <option value="descending">Descendent</option>
               
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