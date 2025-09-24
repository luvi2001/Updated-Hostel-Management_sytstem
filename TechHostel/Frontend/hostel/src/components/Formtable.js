import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import "../css/payment.css";

const Formtable = ({ handleSubmit, handleOnChange, handleclose, rest }) => {
  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handleclose}>
          <IoCloseSharp />
        </div>

        <label htmlFor="name">Name : </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleOnChange}
          value={rest.name}
          readOnly
        />

        <label htmlFor="nic">NIC : </label>
        <input
          type="text"
          id="nic"
          name="nic"
          onChange={handleOnChange}
          value={rest.nic}
          pattern="[0-9]{12}"
          maxLength="12"
          minLength="12"
          title="Please enter a 12-digit NIC number"
          readOnly
        />

        <label htmlFor="issue">Issue : </label>
        <input
          type="text"
          id="issue"
          name="issue"
          onChange={handleOnChange}
          value={rest.issue}
          required
          maxLength="100"
          title="Please enter the relevant issue"
        />

        <label htmlFor="amount">Amount : </label>
        <input
          type="number"
          id="amount"
          name="amount"
          onChange={handleOnChange}
          value={rest.amount}
          required
          min="1"
        />

        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default Formtable;
