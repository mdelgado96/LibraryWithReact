import Nav from "./components/Nav";
import Footer from "./components/Footer"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./pages/Home"
import Books from "./pages/Books"
import { books } from "./data";
import Bookinfo from "./pages/BookInfo";
import Cart from "./pages/Cart";
import { useEffect, useState } from "react";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(book) {
    setCart([...cart, { ...book, quantity: 1 }])
  }

  function changeQuantity(book, quantity) {
    setCart(
      cart.map(item =>
        item.id === book.id
          ? {
            ...item,
            quantity: +quantity,
          }
          : item
      )
    );
  }

  function removeItem(item) {
    setCart(cart.filter(book => book.id !== item.id))
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach(item => {
      counter += item.quantity
    });
    return counter;
  }

  useEffect(() => {
    console.log(cart)
  }, [cart]);

  return (
    <BrowseRouter basename={window.location.path || ''}>
      <div className="App">
        <Nav numberOfItems={numberOfItems()}/>
        <Route exact path="/" component={Home} />
        <Route exact path="/books" render={() => <Books books={books} />} />
        <Route path="/books/:id" render={() => <Bookinfo books={books} addToCart={addToCart} />} />
        <Route
          path="/cart"
          render={() => (
            <Cart
              books={books}
              cart={cart}
              changQuantity={changeQuantity}
              removeItem={removeItem}
            />
          )}
        />
        <Footer />
      </div>
    </BrowseRouter>
  );
}

export default App;
