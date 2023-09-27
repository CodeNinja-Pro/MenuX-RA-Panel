import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const CustomizationCheckList = ({
  customizationOptions,
  setCustomizationOptions,
}) => {
  return (
    <div className="mx-4">
      <FormGroup check>
        <Input
          id="1"
          type="checkbox"
          checked={customizationOptions.get}
          value={customizationOptions?.get}
          onChange={(e) =>
            setCustomizationOptions({
              ...customizationOptions,
              get: e.target.checked,
            })
          }
        />
        <Label check>Get</Label>
      </FormGroup>
      <FormGroup check>
        <Input
          id="2"
          type="checkbox"
          checked={customizationOptions.add}
          value={customizationOptions?.add}
          onChange={(e) =>
            setCustomizationOptions({
              ...customizationOptions,
              add: e.target.checked,
            })
          }
        />
        <Label check>add</Label>
      </FormGroup>
      <FormGroup check>
        <Input
          id="3"
          type="checkbox"
          checked={customizationOptions.update}
          value={customizationOptions?.update}
          onChange={(e) =>
            setCustomizationOptions({
              ...customizationOptions,
              update: e.target.checked,
            })
          }
        />
        <Label check>update</Label>
      </FormGroup>
    </div>
  );
};

export default CustomizationCheckList;
