import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const RequestCheckList = ({ requestOptions, setRequestOptions }) => {
  return (
    <div className="mx-4">
      <FormGroup check>
        <Input
          id="1"
          type="checkbox"
          checked={requestOptions.get}
          value={requestOptions?.get}
          onChange={(e) =>
            setRequestOptions({ ...requestOptions, get: e.target.checked })
          }
        />
        <Label check>Get</Label>
      </FormGroup>
    </div>
  );
};

export default RequestCheckList;
