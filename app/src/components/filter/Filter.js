import React, { Component } from 'react'


function Filter(props) {
    return (
        <div className='row'>
            <div className="col-md-4">
                {props.count} product found
            </div>
            <div className="col-md-4">
                <label htmlFor="order_by">
                    Order by
                    <select name="" id="" className='form-control' value={props.sort}
                        onChange={(e) => props.handleChangeSort(e)}>
                        <option value=""> Select </option>
                        <option value="lowest"> lowest to highest </option>
                        <option value="highest"> highest to lowest </option>

                    </select>
                </label>
            </div>
            <div className="col-md-4">
            {/* <label htmlFor="order_by">
                    Filter Size
                    <select name="" id="" className='form-control' value={props.sort}
                        onChange={(e) => props.handleChangeSize(e)}>
                        <option value=""> Select </option>
                        <option value="5"> 5 Kg </option>
                        <option value="10"> 10 Kg </option>
                        <option value="20"> 20 Kg </option>
                        <option value="30"> 30 Kg </option>

                    </select>
                </label> */}
            </div>

        </div>
    )
}

export default Filter