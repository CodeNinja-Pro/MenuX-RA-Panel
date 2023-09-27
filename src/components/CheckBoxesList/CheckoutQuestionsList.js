import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const CheckoutQuestionsList = ({ checkoutOptions, setCheckoutOptions }) => {
  return (
    <div className="mx-4">
      <FormGroup check>
        <Input
          id="1"
          type="checkbox"
          checked={checkoutOptions.get}
          value={checkoutOptions?.get}
          onChange={(e) =>
            setCheckoutOptions({ ...checkoutOptions, get: e.target.checked })
          }
        />
        <Label check>Get</Label>
      </FormGroup>
      <FormGroup check>
        <Input
          id="1"
          type="checkbox"
          checked={checkoutOptions.add}
          value={checkoutOptions?.add}
          onChange={(e) =>
            setCheckoutOptions({ ...checkoutOptions, add: e.target.checked })
          }
        />
        <Label check>Add</Label>
      </FormGroup>
    </div>
  );
};

export default CheckoutQuestionsList;
