import React from 'react'
import './footer.css'
import logo from "../../assets/images/logo.png"

import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'

const Footer = () => {

  const year = new Date().getFullYear()
  return <footer className="footer">
    <Container>
      <Row>
        <Col lg='4' className='mb-4' md='6'>
          <div className="logo">

            <div>
              <h1 className='text-white'>
                Fincoura
              </h1>
            </div>

          </div>
          <p className="footer__text mt-4">
            Une entreprise passionnée basée à Bamako ! Nous créons des vêtements et du linge de maison uniques en utilisant le bogolan et des tissus teints à la main. Chaque pièce est un hommage à l'artisanat malien, alliant traditions ancestrales et créativité contemporaine. Rejoignez-nous dans notre voyage textile inspirant !
          </p>
        </Col>
        <Col lg='3' className='mb-4' md='3'>
          <div className="footer__quick-links">
            <h4 className="quick__links-title">Top Categories</h4>
            <ListGroup className='mb-3'>
              <ListGroupItem className='ps-0 border-0'>
                <Link to='/shop?category=Vêtements'>Vêtements</Link>
              </ListGroupItem>
              <ListGroupItem className='ps-0 border-0'>
                <Link to='/shop?category=linge de maison'>Linge de Maison </Link>
              </ListGroupItem>
              <ListGroupItem className='ps-0 border-0'>
                <Link to='/shop?category=Cosmetiques'>Cosmétiques</Link>
              </ListGroupItem>
              <ListGroupItem className='ps-0 border-0'>
                <Link to='/shop?category=Accessoires'>Accessoires</Link>
              </ListGroupItem>
            </ListGroup>
          </div>
        </Col>
        <Col lg='2' className='mb-4' md='3'>

          <div className="footer__quick-links">
            <h4 className="quick__links-title">Liens utiles</h4>
            <ListGroup className='mb-3'>
              <ListGroupItem className='ps-0 border-0'>
                <Link to='/shop'>Boutique</Link>
              </ListGroupItem>
              <ListGroupItem className='ps-0 border-0'>
                <Link to='/cart'>Panier</Link>
              </ListGroupItem>
              <ListGroupItem className='ps-0 border-0'>
                <Link to='/login'>Connexion</Link>
              </ListGroupItem>
              {/* <ListGroupItem className='ps-0 border-0'>
                <Link to='#'>Privacy Policy</Link>
              </ListGroupItem> */}
            </ListGroup>
          </div>

        </Col>
        <Col lg='3 ' md='4'>
          <div className="footer__quick-links">
            <h4 className="quick__links-title">Contact</h4>
            <ListGroup className='footer__contact'>
              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                <span><i className="ri-map-pin-line"></i></span>
                <p>ACI 2000 - Immeuble Jean Marie Cissé</p>
              </ListGroupItem>
              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                <span><i className="ri-phone-line"></i></span>
                <p>+223 83 96 63 62</p>
              </ListGroupItem>
              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                <span><i className="ri-mail-line"></i></span>
                <p>promotrice@fincoura.com</p>
              </ListGroupItem>

            </ListGroup>
          </div>
        </Col>
        <Col lg='12'>
          <p className="footer__copyright">Copyright {year} developed by Fly. All right reserved. </p>
        </Col>
      </Row>
    </Container>
  </footer>
}

export default Footer