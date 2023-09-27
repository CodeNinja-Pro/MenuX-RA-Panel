import React, { useEffect } from "react";
import { FormGroup, Input, Label } from "reactstrap";

const OrderChechList = ({ orderOptions, setOrderOptions }) => {
  return (
    <div className="mx-4">
      <FormGroup check>
        <Input
          id="1"
          type="checkbox"
          checked={orderOptions?.get}
          value={orderOptions?.get}
          onChange={(e) =>
            setOrderOptions({ ...orderOptions, get: e.target.checked })
          }
        />
        <Label check>Get</Label>
      </FormGroup>
      <FormGroup check>
        <Input
          id="1"
          type="checkbox"
          checked={orderOptions.update}
          value={orderOptions?.update}
          onChange={(e) =>
            setOrderOptions({ ...orderOptions, update: e.target.checked })
          }
        />
        <Label check>Update</Label>
      </FormGroup>
    </div>
  );
};

export default OrderChechList;
