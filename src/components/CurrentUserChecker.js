import {useEffect, useContext} from 'react';
import useFetch from '../hooks/useFetch'
import { CurrentUserContext} from '../context/currentUser'
import useLocalStorage from '../hooks/useLocalStorage';

function CurrentUserChecker({children}) {
    const[, dispatch] = useContext(CurrentUserContext)
    const [{response}, doFetch]= useFetch('/user')
    const [token]= useLocalStorage('token')
    useEffect(()=>{
        if (!token){
           dispatch({type:'SET_UNAUTHORIZED'})
            return
        }
        doFetch()
        dispatch({type:'LOADING'})
    },[token,dispatch,doFetch])
    useEffect(()=>{
    if (!response){
        return
    }
    dispatch({type:'SET_AUTHORIZED', payload:response.user})
    },[response,dispatch])
    return children
}

export default CurrentUserChecker
