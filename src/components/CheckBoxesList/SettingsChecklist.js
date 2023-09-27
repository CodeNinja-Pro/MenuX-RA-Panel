import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const SettingsChecklist = ({ settingsOptions, setSettingsOptions }) => {
  return (
    <div className="mx-4">
      <FormGroup check>
        <Input
          id="1"
          type="checkbox"
          checked={settingsOptions.get}
          value={settingsOptions?.get}
          onChange={(e) =>
            setSettingsOptions({
              ...settingsOptions,
              get: e.target.checked,
            })
          }
        />
        <Label check>Get</Label>
      </FormGroup>
    </div>
  );
};

export default SettingsChecklist;
