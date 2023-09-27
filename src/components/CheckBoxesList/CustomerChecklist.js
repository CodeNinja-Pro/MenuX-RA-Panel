import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const CustomerChecklist = ({ customerOptions, setCustomerOptions }) => {
  return (
    <div className="mx-4">
      <FormGroup check>
        <Input
          id="1"
          type="checkbox"
          checked={customerOptions?.get}
          value={customerOptions?.get}
          onChange={(e) =>
            setCustomerOptions({
              ...customerOptions,
              get: e.target.checked,
            })
          }
        />
        <Label check>Get</Label>
      </FormGroup>
    </div>
  );
};

export default CustomerChecklist;
