import React from 'react';

export const EditTransactionForm = () => {
  return (
    <>
      <label className="input">
        <input className="input__field" type="number" placeholder=" " />
        <span className="input__label">Amount</span>
      </label>
      <label className="input">
        <input className="input__field" type="text" placeholder=" " />
        <span className="input__label">Category</span> 
      </label>
      <div className="button-group">
        <button>Send</button>
        <button type="reset">Reset</button>
      </div>
    </>
  );
};
