import React from 'react'
import { FormGroup, Input, Label } from 'reactstrap'
import Checklist from './CheckBoxesList/Checklist'
import OrderChechList from './CheckBoxesList/OrderChechList'
import RequestCheckList from './CheckBoxesList/RequestCheckList'
import ReportsChecklist from './CheckBoxesList/ReportsChecklist'
import CatalogChecklist from './CheckBoxesList/CatalogChecklist'
import CheckoutQuestionsList from './CheckBoxesList/CheckoutQuestionsList'
import NotificationsCheckList from './CheckBoxesList/NotificationsCheckList'
import SettingsChecklist from './CheckBoxesList/SettingsChecklist'
import CustomerChecklist from './CheckBoxesList/CustomerChecklist'
import CustomizationCheckList from './CheckBoxesList/CustomizationCheckList'

const UserPermissions = props => {
  const {
    menu,
    setMenu,
    menuOptions,
    setMenuOptions,
    category,
    setCategory,
    categoryOptions,
    setCategoryOptions,
    label,
    setLabel,
    labelOptions,
    setlabelOptions,
    order,
    setOrder,
    orderOptions,
    setOrderOptions,
    setRequests,
    requests,
    requestOptions,
    setRequestOptions,
    reports,
    setReports,
    reportsOptions,
    setreportsOptions,
    catalog,
    setCatalog,
    catalogOptions,
    setCatalogOptions,
    setCheckoutOptions,
    checkoutQuestions,
    checkoutOptions,
    setCheckoutQuestions,
    settings,
    setSettings,
    settingsOptions,
    setSettingsOptions,
    notifications,
    setNotifications,
    notificationsOptions,
    setNotificationsOptions,
    customer,
    setCustomer,
    customerOptions,
    setCustomerOptions,
    customization,
    setCustomization,
    customizationOptions,
    setCustomizationOptions
  } = props
  // console.log(order);
  return (
    <>
      {props.type == 'cook' ? (
        <>
          {' '}
          <FormGroup check>
            <Input
              type='checkbox'
              id='orders'
              checked={order}
              value={order}
              onChange={() => setOrder(!order)}
            />
            <Label check>Orders</Label>
          </FormGroup>
          {order ? (
            <OrderChechList
              orderOptions={orderOptions}
              setOrderOptions={setOrderOptions}
            />
          ) : (
            ''
          )}
        </>
      ) : (
        <>
          <FormGroup check>
            <Input
              id='menuMain'
              type='checkbox'
              checked={menu}
              value={menu}
              onChange={() => setMenu(!menu)}
            />
            <Label check>Menu</Label>
          </FormGroup>
          {menu ? (
            <Checklist
              title='menu'
              data={menuOptions}
              setData={setMenuOptions}
            />
          ) : (
            ''
          )}
          <FormGroup check>
            <Input
              id='categoryMain'
              type='checkbox'
              checked={category}
              value={category}
              onChange={() => setCategory(!category)}
            />
            <Label check>Category</Label>
          </FormGroup>
          {category ? (
            <Checklist
              title='Category'
              data={categoryOptions}
              setData={setCategoryOptions}
            />
          ) : (
            ''
          )}
          <FormGroup check>
            <Input
              id='labelMain'
              type='checkbox'
              checked={label}
              value={label}
              onChange={() => setLabel(!label)}
            />
            <Label check>Label</Label>
          </FormGroup>
          {label ? (
            <Checklist
              title='label'
              data={labelOptions}
              setData={setlabelOptions}
            />
          ) : (
            ''
          )}
          <FormGroup check>
            <Input
              type='checkbox'
              id='orders'
              checked={customer}
              value={customer}
              onChange={() => setCustomer(!customer)}
            />
            <Label check>Customers</Label>
          </FormGroup>
          {customer ? (
            <CustomerChecklist
              customerOptions={customerOptions}
              setCustomerOptions={setCustomerOptions}
            />
          ) : (
            ''
          )}
          <FormGroup check>
            <Input
              type='checkbox'
              id='orders'
              checked={order}
              value={order}
              onChange={() => setOrder(!order)}
            />
            <Label check>Orders</Label>
          </FormGroup>
          {order ? (
            <OrderChechList
              orderOptions={orderOptions}
              setOrderOptions={setOrderOptions}
            />
          ) : (
            ''
          )}

          <FormGroup check>
            <Input
              type='checkbox'
              checked={requests}
              id='requests'
              value={requests}
              onChange={() => setRequests(!requests)}
            />
            <Label check>Requests</Label>
          </FormGroup>
          {requests ? (
            <RequestCheckList
              requestOptions={requestOptions}
              setRequestOptions={setRequestOptions}
            />
          ) : (
            ''
          )}

          <FormGroup check>
            <Input
              type='checkbox'
              checked={reports}
              id='requests'
              value={reports}
              onChange={() => setReports(!reports)}
            />
            <Label check>Reports</Label>
          </FormGroup>
          {reports ? (
            <ReportsChecklist
              reportsOptions={reportsOptions}
              setreportsOptions={setreportsOptions}
            />
          ) : (
            ''
          )}
          <FormGroup check>
            <Input
              type='checkbox'
              checked={catalog}
              id='requests'
              value={catalog}
              onChange={() => setCatalog(!catalog)}
            />
            <Label check>Catalog</Label>
          </FormGroup>
          {catalog ? (
            <CatalogChecklist
              catalogOptions={catalogOptions}
              setCatalogOptions={setCatalogOptions}
            />
          ) : (
            ''
          )}
          <FormGroup check>
            <Input
              type='checkbox'
              checked={checkoutQuestions}
              id='requests'
              value={checkoutQuestions}
              onChange={() => setCheckoutQuestions(!checkoutQuestions)}
            />
            <Label check>Checkout Qs</Label>
          </FormGroup>
          {checkoutQuestions ? (
            <CheckoutQuestionsList
              checkoutOptions={checkoutOptions}
              setCheckoutOptions={setCheckoutOptions}
            />
          ) : (
            ''
          )}
          <FormGroup check>
            <Input
              type='checkbox'
              checked={settings}
              id='requests'
              value={settings}
              onChange={() => setSettings(!settings)}
            />
            <Label check>Settings</Label>
          </FormGroup>
          {settings ? (
            <SettingsChecklist
              settingsOptions={settingsOptions}
              setSettingsOptions={setSettingsOptions}
            />
          ) : (
            ''
          )}
          <FormGroup check>
            <Input
              type='checkbox'
              checked={customization}
              id='requests'
              value={customization}
              onChange={() => setCustomization(!customization)}
            />
            <Label check>Customization</Label>
          </FormGroup>
          {customization ? (
            <CustomizationCheckList
              customizationOptions={customizationOptions}
              setCustomizationOptions={setCustomizationOptions}
            />
          ) : (
            ''
          )}
          <FormGroup check>
            <Input
              type='checkbox'
              checked={notifications}
              id='requests'
              value={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            <Label check>Notifcations</Label>
          </FormGroup>
          {notifications ? (
            <NotificationsCheckList
              notificationsOptions={notificationsOptions}
              setNotificationsOptions={setNotificationsOptions}
            />
          ) : (
            ''
          )}
        </>
      )}
    </>
  )
}

export default UserPermissions
