import { useMutation } from "@apollo/client"
import { Navigate, useNavigate } from 'react-router-dom'
import { FormattedMessage } from "react-intl"
import { Alert } from "@mui/material"
import { Field, Form } from "react-final-form"

import { REGISTER_USER } from "../mutations"
import { FormBase, Input, Button, Backdrop } from './styles'
import useAuth from './../hooks/useAuth';
import Portal from "../components/Portal"

const Register = () => {
  const navigate = useNavigate()
  const { isAuth } = useAuth()
  const [registerUser,{data,error,loading}] = useMutation(REGISTER_USER)

  const onSubmit = (e) => {
      registerUser({variables:{registerInput:{username:e.username,email:e.email,password:e.password}}})
      if(!error){
        navigate('/')
      }
  }

    return (
      <>
        {loading ? (
          <>
            <Portal>
              <Backdrop>
                <h1 style={{ textAlign: "center", position: "absolute" }}>
                  <FormattedMessage id="loading" />
                </h1>
              </Backdrop>
            </Portal>
          </>
        ) : null}
        {isAuth ? (
          <Navigate to="/" />
        ) : (
          <>
            <h1 style={{ textAlign: "center" }}>Register</h1>
            <Form
              onSubmit={onSubmit}
              validate={(values) => {
                const errors = {};
                if (!values.username) {
                  errors.username = "Required";
                }
                if (!values.email) {
                  errors.email = { message: "Required", variant: "error" };
                } else if (
                  !values.email.includes("@") ||
                  !values.email.includes(".")
                ) {
                  errors.email = {
                    message: "Wrong email format",
                    variant: "warning",
                  };
                }
                if (!values.password) {
                  errors.password = { message: "Required", variant: "error" };
                } else if (values.password.length < 6) {
                  errors.password = {
                    message: "Password is too short",
                    variant: "warning",
                  };
                }

                return errors;
              }}
              render={({ handleSubmit }) => (
                <>
                  <FormBase onSubmit={handleSubmit}>
                    <Field name="username">
                      {({ input, meta }) => (
                        <>
                          <Input
                            color="secondary"
                            type="text"
                            placeholder="Write a username..."
                            {...input}
                          />
                          {meta.error && meta.touched && (
                            <Alert severity="error">{meta.error}</Alert>
                          )}
                        </>
                      )}
                    </Field>
                    <Field name="email">
                      {({ input, meta }) => (
                        <>
                          <Input
                            color="secondary"
                            type="text"
                            placeholder="Write a email..."
                            {...input}
                          />
                          {meta.error && meta.touched && (
                            <Alert severity={meta.error.variant}>
                              {meta.error.message}
                            </Alert>
                          )}
                        </>
                      )}
                    </Field>
                    <Field name="password">
                      {({ input, meta }) => (
                        <>
                          <Input
                            color="secondary"
                            type="password"
                            placeholder="Write a password..."
                            {...input}
                          />
                          {meta.error && meta.touched && (
                            <Alert severity={meta.error.variant}>
                              {meta.error.message}
                            </Alert>
                          )}
                        </>
                      )}
                    </Field>
                    <Button type="submit" variant="contained" color="secondary">
                      Register
                    </Button>
                    {error ? (
                      <Alert severity="error">
                        {JSON.stringify(error.message)}
                      </Alert>
                    ) : null}
                  </FormBase>
                </>
              )}
            />
          </>
        )}
      </>
    );
  }
  
  export default Register
  