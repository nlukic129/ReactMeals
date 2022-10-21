import { Fragment, useContext } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContext from "./Context/cart-context";

function App() {
  const ctx = useContext(CartContext);

  return (
    <Fragment>
      {ctx.isCart && <Cart />}
      <Header />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
