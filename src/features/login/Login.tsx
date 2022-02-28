import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./auth-reducer";
import {RootStoreType} from "../../components/app/store";
import {Navigate} from "react-router-dom";
import {LoginRequestType} from "../../api/todolist-task-api";
import {Omit} from "@material-ui/core";

// type FormikErrorType = {
//     email?: string
//     password?: string
//     rememberMe?: boolean
// }

export const Login = () => {

    const dispatch=useDispatch();
    const isLoggedIn=useSelector<RootStoreType,boolean>(state =>state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: Partial<Omit<LoginRequestType,'captcha'>> = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password){
                errors.password = 'Password required';
            } else if (values.password.length < 7) {
                errors.password = 'Must be password at least 7 characters';
            }
            return errors;
        },
            onSubmit: values => {
            dispatch(loginTC(values));
            formik.resetForm();
        },
    })
    if(isLoggedIn){
        return <Navigate to={"/"}/>
}


    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <FormGroup>
                    <TextField label="Email"
                               type={"email"}
                               margin="normal"
                        {...formik.getFieldProps("email")}/>
                    {formik.touched.email && formik.errors.email?<div style={{color:"red"}}>{formik.errors.email}</div>:null}
                    <TextField type="password"
                               label="Password"
                               margin="normal"
                        {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password?<div style={{color:"red"}}>{formik.errors.password}</div>:null}
                    <FormControlLabel label={'Remember me'}

                                      control={<Checkbox {...formik.getFieldProps("rememberMe")}/>}/>
                    <Button type={'submit'}
                            variant={'contained'}
                            color={'primary'}>
                        Login
                    </Button>
                </FormGroup>
            </FormControl>
            </form>
        </Grid>
    </Grid>
}
