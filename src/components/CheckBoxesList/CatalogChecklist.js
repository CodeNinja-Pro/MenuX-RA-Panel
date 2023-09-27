import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const CatalogChecklist = ({ catalogOptions, setCatalogOptions }) => {
  return (
    <div className="mx-4">
      <FormGroup check>
        <Input
          id="1"
          type="checkbox"
          checked={catalogOptions.get}
          value={catalogOptions?.get}
          onChange={(e) =>
            setCatalogOptions({ ...catalogOptions, get: e.target.checked })
          }
        />
        <Label check>Get</Label>
      </FormGroup>
      <FormGroup check>
        <Input
          id="1"
          type="checkbox"
          checked={catalogOptions.add}
          value={catalogOptions?.add}
          onChange={(e) =>
            setCatalogOptions({ ...catalogOptions, add: e.target.checked })
          }
        />
        <Label check>Add</Label>
      </FormGroup>
      <FormGroup check>
        <Input
          id="1"
          type="checkbox"
          checked={catalogOptions.edit}
          value={catalogOptions?.edit}
          onChange={(e) =>
            setCatalogOptions({ ...catalogOptions, edit: e.target.checked })
          }
        />
        <Label check>Edit</Label>
      </FormGroup>
      <FormGroup check>
        <Input
          id="1"
          type="checkbox"
          checked={catalogOptions.delete}
          value={catalogOptions?.delete}
          onChange={(e) =>
            setCatalogOptions({ ...catalogOptions, delete: e.target.checked })
          }
        />
        <Label check>Delete</Label>
      </FormGroup>
    </div>
  );
};

export default CatalogChecklist;
