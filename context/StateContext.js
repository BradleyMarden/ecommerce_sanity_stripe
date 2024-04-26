import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {setCookie, getCookie, hasCookie} from 'cookies-next';
const Context = createContext();
import cook from "js-cookie"
export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [purchaseComplete, setPurchaseComplete] = useState(false);
    const [ cartItemsload, setCartItemsLoad] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  let foundProduct;
  let index;
  
    useEffect(() => {
        console.log("Begin")
        
        let inProgress = cook.get('purchaseInProgress')
        if(inProgress) {
            if (JSON.parse(inProgress) == true) {
                setCartItemsLoad(false)
                return;
            }
        }
        console.log("UPDATED")
        cook.set('cartItems',JSON.stringify(cartItems), {expires: 1/24})
        console.log(cartItems)
    }, [cartItems]);

    useEffect(() => {
        if(purchaseComplete) {
            cook.set('purchaseInProgress', true, {expires: 1 / 24})
        }
        else {
            cook.set('purchaseInProgress', false, {expires: 1 / 24})
            
        }
    }, [purchaseComplete]);
  const setCart = (items) =>{

      console.log("Set cart")
      if(!items)
          return;

      console.log("items")
      setCartItems([]);
      setTotalPrice(0);
      setTotalQuantities(0);
      //let a = JSON.parse(items)
      let a = items
      let addTo = []
      for (let i = 0; i < a.length; i++){
          if(!a[i])
              continue;
          let e = a[i]
          if(!e)
              continue;

          console.log("Adding: " + e._id )
          console.log("Quantity: " + e.quantity )
          
          if(e.isOnSale){
              let discountPrice = (e.price - (e.price / 100 * e.onSalePercent)).toFixed(2)

              setTotalPrice((prevTotalPrice) => prevTotalPrice + discountPrice * e.quantity);
          }
          else {
              setTotalPrice((prevTotalPrice) => prevTotalPrice + e.price * e.quantity);
          }
          setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + e.quantity);
          // if(e.quantity >1)
          //     e.quantity +=1
          addTo.push({
              ...e,
              quantity: e.quantity
          })
          
          // const updatedCartItems = cartItems.map((cartProduct) => {
          //     if(cartProduct._id === e._id) return {
          //         ...cartProduct,
          //         quantity: cartProduct.quantity + e.quantity
          //     }
          // })

          
      }
      setCartItems(addTo);

      setCartItemsLoad(true)
  }
  const onAdd = (product, quantity) => {
      console.log("Adding")
      if(!product)
          return
      console.log("after")
      
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

      console.log(product.isOnSale)
      if(product.isOnSale) {
          let discountPrice = (product.price - (product.price / 100 * product.onSalePercent))
          console.log("discountPrice")
          console.log(discountPrice)
          setTotalPrice((prevTotalPrice) => Math.round((prevTotalPrice + discountPrice * quantity)*100)/100);
          //setTotalPrice((prevTotalPrice) => (prevTotalPrice + discountPrice * quantity));
      }
      else{
          console.log("Norm")
          setTotalPrice((prevTotalPrice) =>  Math.round((prevTotalPrice + product.price * quantity)*100)/100);
      }

      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);
      
    } else {
        console.log(product)
      product.quantity = quantity;
      
      setCartItems([...cartItems, { ...product }]);
    }
    
    toast.success(`${qty} ${product.name} added to the cart.`);
      console.log("ADDED")
      console.log(cartItems)
     // cook.set('cartItems',JSON.stringify(cartItems), {expires: 1/24})
  }
  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

   // setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
      if(foundProduct.isOnSale) {
          let discountPrice = (foundProduct.price - (foundProduct.price / 100 * foundProduct.onSalePercent))
          console.log("discountPrice")
          console.log(discountPrice)
          setTotalPrice((prevTotalPrice) => Math.round((prevTotalPrice - discountPrice * foundProduct.quantity)*100)/100);
      }
      else{
          console.log("Norm")
          setTotalPrice((prevTotalPrice) => Math.round((prevTotalPrice - foundProduct.price * foundProduct.quantity)*100)/100);
      }
    
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
        
    // cook.set('cartItems',JSON.stringify(newCartItems), {expires: 1/24})
    
  }

  const toggleCartItemQuanitity = (id, value, amount = 1) => {
      console.log("AMOUNT " + amount)
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if(value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
        if(foundProduct.isOnSale) {
            let discountPrice = (foundProduct.price - (foundProduct.price / 100 * foundProduct.onSalePercent))
            setTotalPrice((prevTotalPrice) => (prevTotalPrice + discountPrice ));
        }
        else{
            setTotalPrice((prevTotalPrice) => Math.round((prevTotalPrice + foundProduct.price)*100)/100);
        }
      //setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - amount } ]);
        
        var prr = 0
        cartItems.forEach((item) =>{
            console.log("item")
            console.log(item)
            let quan = item.quantity
            if (item._id === id)
                quan = item.quantity - amount
            for (let i = 0; i < quan; i++) {
                console.log("prr")
                console.log(prr)
                if (item.isOnSale){
                    prr += item.price - (item.price / 100 * item.onSalePercent).toFixed()
                }
                else{
                    prr+= item.price;
                }
            }
        })

          console.log("PRICEE " + prr)
          setTotalPrice((prevTotalPrice) => prr)
         /* if(foundProduct.isOnSale) {
              let discountPrice = ((foundProduct.price) - (foundProduct.price / 100 * foundProduct.onSalePercent))
              setTotalPrice((prevTotalPrice) => Math.abs(Math.round(( foundProduct.price - discountPrice)*100)/100));
          }
          else{
              setTotalPrice((prevTotalPrice) => Math.round((prevTotalPrice - foundProduct.price)*100)/100);
          }*/
        //setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - amount)
      }
      else if(foundProduct.quantity === 1){
          onRemove({_id: foundProduct._id})
      }
    }
      console.log("CHANGE")
      console.log(newCartItems)
     // cook.set('cartItems',JSON.stringify(cartItems), {expires: 1/24})
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        showMenu,
        setShowMenu,
        cartItems,
        totalPrice,
        totalQuantities,
          cartItemsload,
         setCartItemsLoad,
        qty,
        incQty,
        decQty,
        onAdd,
      setCart,
        toggleCartItemQuanitity,
        onRemove,
          setPurchaseComplete,
          purchaseComplete,
        setCartItems,
        setTotalPrice,
        setTotalQuantities 
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);