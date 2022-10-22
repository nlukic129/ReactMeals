import { Fragment, useContext, useState } from "react";
import CartContext from "../../Context/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const totalPrice = `$${ctx.totalAmount.toFixed(2)}`;
  const [isCheckout, setIsCheckout] = useState(false);

  const addItemHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const removeItemHandler = (id) => {
    ctx.removeItem(id);
  };

  const checkoutHandler = () => {
    setIsCheckout(true);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addItemHandler.bind(null, item)}
          onRemove={removeItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      {ctx.items.length ? (
        <Fragment>
          <button className={classes["button--alt"]} onClick={ctx.hideCart}>
            Close
          </button>
          <button className={classes.button} onClick={checkoutHandler}>
            Order
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <button className={classes["button--alt"]} onClick={ctx.hideCart}>
            Close
          </button>
        </Fragment>
      )}
    </div>
  );

  return (
    <Modal hideCart={props.hideCart}>
      {!ctx.items.length ? <p>Cart is empty</p> : cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{ctx.items.length ? totalPrice : "$0.00"}</span>
      </div>
      {!isCheckout && modalActions}
      {isCheckout && <Checkout onCancel={ctx.hideCart} />}
    </Modal>
  );
};

export default Cart;
