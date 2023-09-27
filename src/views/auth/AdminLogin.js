import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Spinner,
  Label
} from 'reactstrap'
import Mdark from '../../assets/img/Mdark.svg'
import eyeSvg from '../../assets/img/eyeSvg.svg'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [eye, setEye] = useState(false)
  let { loading } = useSelector(state => state.auth)
  return (
    <>
      <Col lg='5' md='5' className='admin-login__form'>
        <Card className='border-0'>
          <CardBody className='px-lg-5 py-lg-4'>
            <div className=' d-flex flex-column justify-content-center align-items-center'>
              <img src={Mdark} alt='' className='mb-3 form__img' />
              <div className='d-flex flex-column justify-content-center align-items-center'>
                <h3 className='title'>Welcome</h3>
                <p className='typography'>
                  Enter your credentials to access your account
                </p>
              </div>
            </div>
            <Form
              onSubmit={e => {
                e.preventDefault()
                let creds = {
                  email: email,
                  password: password
                }
                console.log({ creds })
                // dispatch(login(creds));
              }}
            >
              <FormGroup className='mb-3'>
                <Label className='form_label'>Email</Label>
                <Input
                  placeholder='example@gmail.com'
                  type='email'
                  autoComplete='new-email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup className='mb-0'>
                <Label className='form_label'>Password</Label>
                <div className='login__password'>
                  <Input
                    placeholder='Password'
                    // type="password"
                    type={eye ? 'text' : 'password'}
                    autoComplete='new-password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <img src={eyeSvg} alt='' onClick={() => setEye(!eye)} />
                </div>
              </FormGroup>
              <Row className='mt-0 mx-2 justify-content-end'>
                <Link to='/auth/forget-password' className='pointer'>
                  <small>Forgot password?</small>
                </Link>
              </Row>
              <Button
                className='my-3 w-100 login__btn'
                type='submit'
                // disabled={!email || !password}
              >
                {loading ? <Spinner size='sm' /> : 'Login'}
              </Button>
            </Form>
          </CardBody>
        </Card>
        {/* <div>
          <div className=" d-flex flex-column justify-content-center align-items-center">
            <img src={Mdark} alt="" className="mb-3" />
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h3 className="title">Welcome</h3>
              <p className="typography">
                Enter your credentials to access your account
              </p>
            </div>
          </div>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              let creds = {
                email: email,
                password: password,
              };
              dispatch(login(creds));
            }}
          >
            <FormGroup className="mb-3">
              <Label className="form_label">Email</Label>
              <Input
                placeholder="example@gmail.com"
                type="email"
                autoComplete="new-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-0">
              <Label className="form_label">Password</Label>
              <div className="login__password">
                <Input
                  placeholder="Password"
                  // type="password"
                  type={eye ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <img src={eyeSvg} alt="" onClick={() => setEye(!eye)} />
              </div>
            </FormGroup>
            <Row className="mt-0 mx-2 justify-content-end">
              <Link to="/auth/forget-password" className="pointer">
                <small>Forgot password?</small>
              </Link>
            </Row>
            <Button
              className="my-3 w-100 login__btn"
              type="submit"
              // disabled={!email || !password}
            >
              {loading ? <Spinner size="sm" /> : "Login"}
            </Button>
          </Form>
        </div> */}
      </Col>
    </>
  )
}

export default AdminLogin
