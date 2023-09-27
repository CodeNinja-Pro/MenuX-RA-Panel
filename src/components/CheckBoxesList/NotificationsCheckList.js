import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const NotificationsCheckList = ({
  notificationsOptions,
  setNotificationsOptions,
}) => {
  return (
    <div className="mx-4">
      <FormGroup check>
        <Input
          id="1"
          type="checkbox"
          checked={notificationsOptions.get}
          value={notificationsOptions?.get}
          onChange={(e) =>
            setNotificationsOptions({
              ...notificationsOptions,
              get: e.target.checked,
            })
          }
        />
        <Label check>Get</Label>
      </FormGroup>
    </div>
  );
};

export default NotificationsCheckList;
