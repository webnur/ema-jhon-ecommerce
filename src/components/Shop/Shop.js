import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    useEffect(() => {
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = []
        for(const id in storedCart){
            const addedProduct = products.find(product => product.id === id);
           
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct)

            }

        }
        setCart(savedCart)
    },[products])

    // const handleAddToCart = (product) => {
    //     console.log(product)
    //     //const exits = cart.find(product => product.id === selectedProduct.id);
    //     //console.log(exits)
    //     const newCart = [...cart, product]
    //     setCart(newCart)
    //     addToDb(product.id)
    // }


    const handleAddToCart = (selectedProduct) => {
        console.log(selectedProduct)
        const exits = cart.find(product => product.id === selectedProduct.id);
        console.log(exits)
        let newCart = []
        if(!exits){
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct]

        }
        else{
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exits.quantity = exits.quantity + 1;
            newCart = [...rest, exits]
        }
        // const newCart = [...cart, selectedProduct]
        setCart(newCart)
        addToDb(selectedProduct.id)
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                
               
                {
                    products.map(product => <Product 
                        product={product}
                         key={product.id}
                         handleAddToCart={handleAddToCart}
                         ></Product>)
                }
            </div>
            <div className="cart-container">
              <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;