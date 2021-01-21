import React, { useState } from 'react'
import { FormControl, FormLabel, FormErrorMessage, Input, Button, Box, Textarea } from "@chakra-ui/react";
import { Post } from "../Util/JsonUtil";
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import PostManage from '../Components/PostManage';
import { useMutation, useQuery } from "react-query";
import {queryClient} from "../reactQuery";

const createPost =({title, description}) =>{
   return Post("http://localhost:3002/posts", {
    title, description
})
}

const PostEdit = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const history = useHistory()


  const mutate = useMutation(createPost)

    const onSubmitHandler = (value) => {
        const {title,description}= value
     mutate.mutateAsync({title, description}).then(data=>{
        // console.log(data)
        // setTitle("")
        // setDescription("")
        history.push("/posts")
     }).catch(err=>{
         console.log(err)
     })
        // const {title, description} = value
        //    Post("http://localhost:3002/posts", {
        //        title, description
        //    }).then(data=>{
        //       console.log(data)
        //       setTitle("")
        //       setDescription("")
        //       history.push("/posts")
        //    }).catch(err=>{
        //        console.log(err)
        //    })
    }
   
    return (
        <Box maxW="40%" marginX="auto">
           <PostManage onSubmit={onSubmitHandler}/>
        </Box>
    )
}

export default PostEdit
