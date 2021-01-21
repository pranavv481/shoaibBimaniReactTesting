
import React ,{useState} from 'react'

const useList =  ({initialValues =[]}={}) => {
    const [list, setList] = useState(()=>initialValues);

    const add = (newItem)=>{
       return setList([...list, newItem])
    }

    const remove = (index) =>{
        const newList = list.filter((listItem, i)=>{
            return index != i
        })
        setList(newList)
    }
    return {
        list,add, remove
    }
}

export default useList
