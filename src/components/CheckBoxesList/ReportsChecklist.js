import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const ReportsChecklist = ({ reportsOptions, setreportsOptions }) => {
  return (
    <div className="mx-4">
      <FormGroup check>
        <Input
          id="1"
          type="checkbox"
          checked={reportsOptions.get}
          value={reportsOptions?.get}
          onChange={(e) =>
            setreportsOptions({ ...reportsOptions, get: e.target.checked })
          }
        />
        <Label check>Get</Label>
      </FormGroup>
      <FormGroup check>
        <Input
          id="1"
          type="checkbox"
          checked={reportsOptions.export}
          value={reportsOptions?.export}
          onChange={(e) =>
            setreportsOptions({ ...reportsOptions, export: e.target.checked })
          }
        />
        <Label check>Export</Label>
      </FormGroup>
    </div>
  );
};

export default ReportsChecklist;
