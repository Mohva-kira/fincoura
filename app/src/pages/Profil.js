import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import useAuth from '../custom-hooks/useAuth'
import userIcon from "../assets/images/user-icon.png"
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import '../styles/profil.css'


const Profil = () => {

    const { currentUser } = useAuth()

    return <Helmet title='profil'>
        <CommonSection title={currentUser.displayName} />
        <section className='profil__section'>
            <Container>
                <Row >
                    
                    <Col lg='4'>
                        <img src={currentUser ? currentUser.photoURL : userIcon} alt="img" />
                    </Col>
                    <Col lg='8' className='d-flex align-items-start justify-content-center flex-column' >
                        <span>Name: {currentUser.displayName}</span>
                        <span>email: {currentUser.email}</span>
                    </Col>
                </Row>
            </Container>
        </section>
        <section >
            <Container className='profil__infos '>
                <Row>
                    <div className='d-flex gap-2'>
                        <Col md='4' lg="3">
                            <div className='item'>
                                <span><i className="ri-heart-line"></i></span>
                                <div>
                                    <h3>Favourites</h3>
                                </div>
                            </div>

                        </Col>
                        <Col md='4' lg="3">
                            <div className='item'>
                                <span><i className="ri-contacts-line"></i></span>
                                <div>
                                    <h3>Following</h3>
                                </div>
                            </div>
                        </Col>
                        <Col md='4' lg="3">
                            <div className='item'>
                                <span><i className="ri-coupon-line"></i></span>
                                <div>
                                    <h3>Coupons</h3>
                                </div>
                            </div>
                        </Col>
                        <Col md='4' lg="3">
                            <div className='item'>
                                <span><i className="ri-history-line"></i></span>
                                <div>
                                    <h3>History</h3>
                                </div>
                            </div>
                        </Col>
                    </div>
                </Row>
            </Container>
        </section>
        <section>
            <Container>
                <Row>
                    <Col lg='6' className='d-flex align-items-start justify-content-center flex-column'> <h2>My last orders</h2>
                        <hr />
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti fuga autem</span>
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti fuga autem</span>
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti fuga autem</span>
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti fuga autem</span>


                    </Col>
                    <Col lg='6'> <h2>My last orders</h2></Col>
                </Row>
            </Container>
        </section>
    </Helmet>
}

export default Profil