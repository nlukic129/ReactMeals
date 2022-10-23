import { Fragment, useContext, useEffect, useState } from "react";
import CartContext from "../../Context/cart-context";
import useHttp from "../../hooks/use-http";
import Feedback from "../UI/Feedback";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const totalPrice = `$${ctx.totalAmount.toFixed(2)}`;
  const [isCheckout, setIsCheckout] = useState(false);
  let isCartEmpty = true;
  let cartContent;
  const { error, isLoading, sendRequest: submitOrder } = useHttp();
  const [feedback, setFeedback] = useState();

  const addItemHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const removeItemHandler = (id) => {
    ctx.removeItem(id);
  };

  const checkoutHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    submitOrder({
      url: "https://reactmeals-f6e16-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      method: "POST",
      body: { user: userData, orderedItems: ctx.items },
    });

    setFeedback(
      <Feedback isSuccess={true}>
        Your order has been accepted. We will contact you soon.
      </Feedback>
    );

    ctx.clearItems();
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

  if (ctx.items.length) {
    isCartEmpty = false;
  }

  const modalActions = (
    <div className={classes.actions}>
      {!isCartEmpty ? (
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

  if (!isCartEmpty && isCheckout) {
    cartContent = (
      <Checkout onConfirm={submitOrderHandler} onCancel={ctx.hideCart} />
    );
  } else {
    cartContent = modalActions;
  }

  useEffect(() => {
    if (error) {
      setFeedback(<Feedback isSuccess={false}>{error}</Feedback>);
    }
  }, [error]);

  return (
    <Modal hideCart={props.hideCart}>
      {isLoading ? <p>Sending order data...</p> : feedback}
      {isCartEmpty ? <p>Cart is empty</p> : cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{!isCartEmpty ? totalPrice : "$0.00"}</span>
      </div>
      {cartContent}
    </Modal>
  );
};

export default Cart;
