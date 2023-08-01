import { createContext, useReducer, useEffect } from 'react'
import reducers from './Reducers'
import axios from "axios";


export const DataContext = createContext()


export const DataProvider = ({children}) => {
    const initialState = { 
        notify: {}, auth: {}
    }

    const [state, dispatch] = useReducer(reducers, initialState)

    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin");
        if(firstLogin){
            const rf_token = localStorage.getItem("rf_token");
            getData('auth/refresh_token', {rf_token}).then(res => {
                if(res.err) return localStorage.removeItem("firstLogin")
                dispatch({ 
                    type: "AUTH",
                    payload: {
                        token: res.data.access_token,
                        user: res.data.user
                    }
                })
            })
        }
        
    },[])

    const getData = async (url, post, token) => {
        const res = await axios.post(
            `http://localhost:5000/${url}`,
            post,
            {
              headers: { Authorization: token },
            }
          );
          return res;
    }

    return(
        <DataContext.Provider value={{state, dispatch}}>
            {children}
        </DataContext.Provider>
    )
}