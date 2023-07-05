import React from 'react'
import util from '../../util'

const Basket = (props) => {
  const { cartItems } = props
  return (
    <div className="alert alert-info">
      {cartItems.length === 0 ? " Cart is empty" : <div> You have {cartItems.length} products in you cart </div>}
      {cartItems.length > 0 &&
      
        <div className='m-0 mb-2'>
       
          <ul>
            {cartItems.map(item =>
              <li key={item.id}>
                <b> {item.name[0].value} </b> x {item.count} = {item.price * item.count}
                <button className="btn btn-danger"
                  onClick={(e) => props.handleRemoveFromCart(e, item)}>
                  x
                </button>
              </li>
            )}
          </ul>
          Total = {util.formatCirrency(cartItems.reduce((a,c)=> a + c.price*c.count, 0))}
          <hr />
          <button className="btn btn-primary" onClick={()=>alert("Checkout needs to implement")}> Checkout </button>
        </div>
      }

    </div>
  )
}

export default Basket