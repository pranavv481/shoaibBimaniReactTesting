import React,{useEffect, useState} from 'react'

const useFetch = ({URL}) => {
    const [data,setData] = useState([]);
    const [isLoading, setLoading] = useState(true)
    useEffect(()=>{
    setLoading(true)
    fetch(URL)
    .then((res)=>res.json())
    .then((data)=>{
        setLoading(false)
        setData(data)
    })
    },[URL])
    return {
        data,
        isLoading
    }
}

export default useFetch
