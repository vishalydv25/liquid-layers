import React from "react";
import { useAuth } from "../../Context";
import { addNewAddress, editAddress } from "../../Utils";
import styles from "./AddressModal.module.css";

const AddressModal = ({
  modalState,
  setModalState,
  address,
  setAddress,
  setIsEditing,
  isEditing = {}
}) => {
  const {
    authState: { token },
    authDispatch
  } = useAuth();
  const inputHandler = (e) => {
    const {
      target: { name }
    } = e;
    const {
      target: { value }
    } = e;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const saveBtnHandler = (e) => {
    if (
      address.name &&
      address.street &&
      address.city &&
      address.zipCode &&
      address.state &&
      address.mobile
    ) {
      e.preventDefault();
      if (isEditing.editing) {
        editAddress({ token, address, authDispatch, _id: isEditing._id });
        setIsEditing((prev) => ({ ...prev, editing: false }));
      } else {
        addNewAddress(token, address, authDispatch);
      }
      setAddress((prev) => ({
        ...prev,
        name: "",
        street: "",
        city: "",
        zipCode: "",
        state: "",
        mobile: ""
      }));
      setModalState(false);
    }
  };

  const dummyBtnHandler = () =>
    setAddress((prev) => ({
      ...prev,
      name: "Adarsh Balika",
      street: "15, Plot No11 , Sec 12",
      city: "Mumbai",
      zipCode: "754162",
      state: "Maharashtra",
      mobile: "121212212"
    }));

  return (
    <>
      <div
        className={`modal-backdrop ${styles.backdrop} ${
          !modalState ? styles.hide : ""
        }`}
      ></div>
      <form
        className={`modal ${styles.modal} ${!modalState ? styles.hide : ""}`}
      >
        <div className={styles.formTitle}>
          <p>Enter new Address</p>
          <button type="button" onClick={() => setModalState(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Full Name"
          value={address.name}
          onChange={inputHandler}
          required
        />
        <input
          type="text"
          id="street"
          name="street"
          placeholder="Enter your Street"
          value={address.street}
          onChange={inputHandler}
          required
        />
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Enter your City"
          value={address.city}
          onChange={inputHandler}
          required
        />
        <input
          type="number"
          id="zipCode"
          name="zipCode"
          placeholder="Enter your Pincode"
          value={address.zipCode}
          onChange={inputHandler}
          required
        />
        <input
          type="text"
          id="state"
          name="state"
          placeholder="Enter your State"
          value={address.state}
          onChange={inputHandler}
          required
        />
        <input
          type="number"
          id="mobile"
          name="mobile"
          placeholder="Enter your phone number"
          value={address.mobile}
          onChange={inputHandler}
          required
        />
        <div className={styles.btnContainer}>
          <button
            className="btn grey-bg"
            onClick={dummyBtnHandler}
            type="button"
          >
            Dummy Address
          </button>
          <button
            className="btn btn-info"
            onClick={saveBtnHandler}
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export { AddressModal };
