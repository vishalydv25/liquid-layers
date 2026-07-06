import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth, useCart } from "../../Context";
import {
  addToOrders,
  discount,
  discountedPrice,
  finalValue,
  totalPrice
} from "../../Utils";
import { AddressModal } from "../index";
import styles from "./Checkout.module.css";

const Checkout = ({ couponType, setCheckout, deleteHandler }) => {
  const [modalState, setModalState] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    zipCode: "",
    state: "",
    mobile: ""
  });
  const [addressId, setAddressId] = useState();
  const {
    authState: { address: userAddress }
  } = useAuth();
  const {
    cartState: { cart }
  } = useCart();

  const totalPayable = totalPrice(cart);

  const priceAfterDiscount = discountedPrice(cart);

  const totalDiscount = discount(totalPayable.price, priceAfterDiscount);

  const totalAmount = (totalPayable.price - totalDiscount + 40).toFixed(2);

  const finalPayable = finalValue(couponType, totalAmount);

  const deliveryAddress = userAddress.find(
    (address) => address._id === addressId
  );

  const placeOrder = async () => {
    const response = await loadSdk();
    if (response) {
      toast.error("Something went wrong");
    } else {
      toast.error("Something went wrong");
    }
  };

  const loadSdk = async () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  return (
    <>
      {modalState ? (
        <AddressModal
          modalState={modalState}
          setModalState={setModalState}
          address={address}
          setAddress={setAddress}
        />
      ) : null}
      <h3 className={styles.pgTitle}>Checkout</h3>
      <div className={styles.backBtnContainer}>
        <button onClick={() => setCheckout(false)}>Go Back</button>
      </div>
      <section className={styles.checkoutPg}>
        <aside>
          {userAddress.length > 0
            ? userAddress.map((address) => (
                <div key={address._id} className={styles.addressContainer}>
                  <input
                    type="radio"
                    id={address._id}
                    name="address"
                    onChange={(e) => setAddressId(e.target.id)}
                  />
                  <label htmlFor={address._id}>
                    <span className={styles.userName}>{address.name}</span>
                    <span className={styles.address}>
                      {address.street}, {address.city} - {address.zipCode}.{" "}
                      {address.state}
                    </span>
                    <span>Mobile No. - {address.mobile}</span>
                  </label>
                </div>
              ))
            : null}
          <button className="btn btn-info" onClick={() => setModalState(true)}>
            Add new Address
          </button>
        </aside>
        <div className={styles.summaryContainer}>
          <h3>Order Summary</h3>
          <div>
            <div>
              {cart.map((item) => (
                <div key={item._id} className={styles.flexItem}>
                  <span>
                    {item.title} ({item.price} x {item.qty})
                  </span>
                  <span>{(item.price * item.qty).toFixed(2)} /-</span>
                </div>
              ))}
              <div className={`${styles.flexItem} ${styles.topBorder}`}>
                <span>Total Price</span>
                <span>{totalPayable.price.toFixed(2)} /-</span>
              </div>
              <div className={styles.flexItem}>
                <span>Discount</span>
                <span>- {totalDiscount.toFixed(2)} /-</span>
              </div>
              {totalAmount !== finalPayable ? (
                <div className={styles.flexItem}>
                  <span>Coupon Discount</span>
                  <span>- {(totalAmount - finalPayable).toFixed(2)} /-</span>
                </div>
              ) : null}
              <div className={styles.flexItem}>
                <span>Delivery Charges</span>
                <span>40 /-</span>
              </div>
              <div className={`${styles.flexItem} ${styles.topBorder}`}>
                <span>Total Amount</span>
                <span>{Number(finalPayable).toFixed(2)} /-</span>
              </div>
              <div className={styles.topBorder}>
                <div>Address</div>
                <div className={styles.deliveryAddress}>
                  {deliveryAddress ? (
                    <>
                      <span className={styles.userName}>
                        {deliveryAddress.name}
                      </span>
                      <span className={styles.address}>
                        {deliveryAddress.street}, {deliveryAddress.city} -{" "}
                        {deliveryAddress.zipCode}. {deliveryAddress.state}
                      </span>
                      <span>Mobile No. - {deliveryAddress.mobile}</span>
                    </>
                  ) : (
                    "Select an Address"
                  )}
                </div>
              </div>
            </div>
            <button
              className={`btn btn-primary ${styles.btn} ${
                deliveryAddress ? "" : styles.defaultBtn
              }`}
              disabled={!deliveryAddress}
              onClick={placeOrder}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export { Checkout };
