import { useContext } from "react"
import { Navigate, useNavigate } from 'react-router-dom'
import { useMutation } from "@apollo/client"

import { Alert } from "@mui/material"
import { Field, Form } from "react-final-form"

import { FormBase, Input, Button, Backdrop } from './styles'
import { Context } from './../providers/context/context';
import { LOGIN_USER } from "../mutations"
import { ACTIONS } from "../providers/context/constants"
import { saveToStorage } from "../utils/sessionStorage"
import useAuth from './../hooks/useAuth';
import Portal from "../components/Portal"
import { FormattedMessage } from "react-intl"


const Login = () => {
  const {dispatch} = useContext(Context)
  const navigate = useNavigate()
  const { isAuth } = useAuth()
  const [loginUser, { error, loading, data }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const {loginUser:{username,email,token, settings:{locale,saveLists}}} = data
      const userPayload = {username,email,token};
      dispatch({ type: ACTIONS.SET_USER, payload: userPayload });
      saveToStorage("username",username);
      saveToStorage("email", email);
      saveToStorage("token", token);
      saveToStorage("saveLists", saveLists);
      saveToStorage("locale", locale);
      navigate('/')
    },
  });
  
  const onSubmit = (e) => {
    loginUser({variables:{loginInput:{email:e.email,password:e.password}}})
  }
  // if(isAuth){
  //   navigate('/')
  // }


    return (
      <>
        {loading ? (
          <>
            <Portal>
              <Backdrop>
                <h1 style={{ textAlign: "center", position: "absolute" }}>
                  <FormattedMessage id='loading'/>
                </h1>
              </Backdrop>
            </Portal>
          </>
        ) : null}
        {isAuth ? (
          <Navigate to="/" />
        ) : (
          <>
            <h1 style={{ textAlign: "center" }}>Login</h1>
            <Form
              onSubmit={onSubmit}
              validate={(values) => {
                const errors = {};
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
                      Login
                    </Button>
                    {error ? (
                      <Alert severity="error">{error.message}</Alert>
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
  
  export default Login
  