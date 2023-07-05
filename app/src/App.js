import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { useGetProductsQuery } from './reducers/products';
import Filter from './components/filter/Filter';
import Basket from './components/basket/Basket'
import Layout from './components/Layout/Layout';
function App(props) {
  
  return <Layout/>;
}

export default App;
