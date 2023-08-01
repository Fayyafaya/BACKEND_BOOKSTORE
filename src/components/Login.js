import { useState,  useContext, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import { DataContext } from '../store/GlobalState'
import { useNavigate } from "react-router-dom";
import Cookie from 'js-cookie'

const Login = () => {
    const navigate = useNavigate();
    const {state, dispatch} = useContext(DataContext)
    const { auth } = state
    const [userState, setUserState] = useState({
        username: '',
        password: ''
    })
    const { username, password } = userState
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUserState({
          ...userState,
          [name]: value,
        });
      };

    const handleLogin = async () => {
        await axios
        .post("http://localhost:5000/auth/login", {
          username: String(username),
          password: String(password),
        })
        .then((res) => {
            dispatch({ type: 'AUTH', payload: {
                token: res.data.access_token,
                user: res.data.user
              }})
          
              Cookie.set('refreshtoken', res.data.refresh_token, {
                path: 'api/auth/accessToken',
                expires: 7
              })
              localStorage.setItem('rf_token', res.data.refresh_token)
              localStorage.setItem('firstLogin', true)
        });
    }
    useEffect(() => {
        if (auth.token) navigate("/");
      }, [auth.token, navigate]);
  return (
    <div className='h-screen w-full flex flex-wrap justify-center gap-x-10'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-5xl pb-5 uppercase'>Login</h1>

          <div className='p-5'>
            <TextField
              id='outlined-basic'
              label='Username'
              variant='outlined'
              name='username'
              onChange={handleChangeInput}
            />
          </div>
          <div className='p-5'>
            <TextField
              id='filled-password-input'
              label='Password'
              variant='outlined'
              name='password'
              type='password'
              autoComplete='current-password'
              onChange={handleChangeInput}
            />
          </div>

          <div className='p-5'>
            <Button variant='contained' onClick={handleLogin}>Login</Button>
          </div>
      </div>
    </div>
  );
};

export default Login;
