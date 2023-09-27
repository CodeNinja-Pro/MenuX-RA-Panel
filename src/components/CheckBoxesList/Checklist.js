import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const Checklist = ({ title, data, setData }) => {
  return (
    <div className="mx-4">
      <FormGroup check>
        <Input
          id="1"
          type="checkbox"
          defaultChecked
          value={data?.get}
          onChange={(e) => setData({ ...data, get: e.target.checked })}
        />
        <Label check>Get</Label>
      </FormGroup>
      <FormGroup check>
        <Input
          id="2"
          type="checkbox"
          checked={data?.add}
          value={data?.add}
          onChange={(e) => setData({ ...data, add: e.target.checked })}
        />
        <Label check>Add</Label>
      </FormGroup>
      <FormGroup check>
        <Input
          id="3"
          type="checkbox"
          checked={data?.edit}
          value={data?.edit}
          onChange={(e) => setData({ ...data, edit: e.target.checked })}
        />
        <Label check>Edit</Label>
      </FormGroup>
      <FormGroup check>
        <Input
          id="4"
          type="checkbox"
          checked={data?.delete}
          value={data?.delete}
          onChange={(e) => setData({ ...data, delete: e.target.checked })}
        />
        <Label check>Delete</Label>
      </FormGroup>
      {title === "menu" ? (
        <>
          <FormGroup check>
            <Input
              id="5"
              type="checkbox"
              checked={data?.import}
              value={data?.import}
              onChange={(e) => setData({ ...data, import: e.target.checked })}
            />
            <Label check>Import</Label>
          </FormGroup>
          <FormGroup check>
            <Input
              id="6"
              type="checkbox"
              checked={data?.export}
              value={data.export}
              onChange={(e) => setData({ ...data, export: e.target.checked })}
            />
            <Label check>Export</Label>
          </FormGroup>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Checklist;
