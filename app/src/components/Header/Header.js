import React, { useRef, useEffect } from 'react'
import './header.css'
import { Container, Row, Toast } from 'reactstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from "../../assets/images/logo_complet.png"
import userIcon from "../../assets/images/user-icon.png"
import { motion } from 'framer-motion'

import { useSelector } from 'react-redux'
import useAuth from '../../custom-hooks/useAuth'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.config'
import { toast } from 'react-toastify'
import i18next from '../../i18next'
import { useTranslation } from 'react-i18next'


const nav__links = [
  {
    path: 'home',
    display: 'Accueil'
  },
  {
    path: 'shop?category=linge de maison',
    display: 'Linge de maison '
  },
  {
    path: 'shop?category=Vêtements',
    display: 'Vêtements'
  },
  {
    path: 'shop?category=Acessoires',
    display: 'Acessoires'
  },
  {
    path: 'shop?category=Cosmetiques',
    display: 'Cosmetiques'
  },
  {
    path: 'cart',
    display: 'Panier'
  }
]

const Header = () => {

  const headerRef = useRef(null)
  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const profileActionRef = useRef(null)
  const lngActionRef = useRef(null)

  const menuRef = useRef(null)
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const { t, i18n } = useTranslation()
  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header')
      } else {
        headerRef.current.classList.remove('sticky__header')

      }
    })
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('drupalOder')
    localStorage.removeItem('logout')
    signOut(auth).then(() => {
    
      toast.success('Logged out')
      navigate('/home')
    }).catch(err => {
      Toast.error(err.message)
    })
  }

  useEffect(() => {
    stickyHeaderFunc()

    return () => window.removeEventListener('scroll', stickyHeaderFunc)
  })

  const menuToggle = () => menuRef.current.classList.toggle('active__menu')
  const navigateToCart = () => {
    navigate('/cart')
  }

  const toggleProfileActions = () => profileActionRef.current.classList.toggle('show__profileActions')
  const toggleLngActions = () => lngActionRef.current.classList.toggle('show__lngActions')

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('lng', lng)
  }

  return (
    <header className='header' ref={headerRef}>
      {console.log(currentUser)}
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />

              <div>


              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {
                  nav__links.map((item, index) => (
                    <li className='nav__item' key={index}>
                      <NavLink className={(navClass) => navClass.isActive ? 'nav__active' : ''} to={item.path}> {item.display} </NavLink>
                    </li>
                  )

                  )
                }
              </ul>
            </div>

            <div className="nav__icons">

              <div className='lng' onClick={toggleLngActions}>
                <span className="lng__badge"> {localStorage.getItem('lng') || 'en'} </span>
                <div className="lng__actions" ref={lngActionRef} onClick={toggleLngActions}>
                  <div className='d-flex align-items-center justify-content-center flex-column'>
                    <Link onClick={() => handleChangeLanguage('en')}>EN</Link>
                    <Link onClick={() => handleChangeLanguage('fr')}>FR</Link>
                  </div>


                </div>
              </div>
              <span className='fav__icon'>
                <i className="ri-heart-line"></i>
                <span className="badge">1</span>
              </span>
              <span className='cart__icon' onClick={navigateToCart}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badge"> {totalQuantity} </span>
              </span>
              <div className='profile'>
                <motion.img whileTap={{ scale: 1.2 }} src={currentUser ? currentUser.photoURL : userIcon} alt="" onClick={toggleProfileActions} />


                <div className="profile__actions" ref={profileActionRef} onClick={toggleProfileActions}>
                  {currentUser ?
                    <div className='d-flex align-items-center justify-content-center flex-column'>
                      <Link to={`/profil/${currentUser.uid}`}>Profil</Link>
                      <Link to='/orders'>My orders</Link>
                      <span onClick={logout}>logout</span>
                    </div>

                    :

                    <div className='d-flex align-items-center justify-content-center flex-column'>
                      <Link to='/signup'>Signup</Link>
                      <Link to='/login'>Login</Link>
                    </div>

                  }
                </div>
              </div>
              <div className="mobile_menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line" ></i>
                </span>
              </div>
            </div>


          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header