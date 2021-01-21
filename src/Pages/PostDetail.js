import { Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,Box } from '@chakra-ui/react';
import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import PostManage from '../Components/PostManage';
import { Get, Put } from '../Util/JsonUtil';
import { useMutation, useQuery } from "react-query";
import {queryClient} from "../reactQuery";
import CommentList from '../Components/CommentList';
import CommentEdit from '../Components/CommentEdit';



const PostDetail = () => {
    // const [postDetail, setPostDetail] = useState(null)
    const {postId} = useParams()
    

   const {isLoading, error, data, refetch} = useQuery("postDetail", ()=>{
      return  Get(`http://localhost:3002/posts/${postId}`)
    })

    const editPost = ({postId, title, description})=>{
      return Put(`http://localhost:3002/posts/${postId}`,{
        title, description
      })
  }

    const mutate = useMutation(editPost)
     console.log(mutate)
    const { isOpen, onOpen, onClose } = useDisclosure()
   
    // const getPostDetail = ()=>{
    //     Get(`http://localhost:3002/posts/${postId}`).then(res=>{
    //         console.log(res)
    //         setPostDetail(res.data)
            
    //     }).catch(err=>{
    //         console.log(err)
            
    //     })
    // }


    const onSubmitHandler = (values) =>{
      const {title, description} = values;
      mutate.mutateAsync({postId,title, description }).then(res=>{
        onClose()
        refetch()
        queryClient.refetchQueries(['postList'])
      }).catch(err=>{
        console.log(err)
      })
       console.log(values)
      //  Put(`http://localhost:3002/posts/${postId}`,values).then(res=>{
      //       console.log(res)
      //       onClose()
      //       refetch()
      //       // setPostDetail(res.data)
      //   }).catch(err=>{
      //       console.log(err)

      //   })
    }
    useEffect(()=>{
       refetch()
    },[postId])
    return (
        <Box width="80%">
           {isLoading?"Loading...":
           <Box>{data.data.description}<Box display="flex" justifyContent="flex-end"><Button onClick={onOpen}>Edit</Button></Box>
         
           <CommentEdit postId={postId}/>
           <CommentList postId={postId}/>
             <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Post Manage</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PostManage onSubmit={onSubmitHandler}
             defaultTitle={data.data.title}
             defaultDescription={data.data.description}
              />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
           
           </Box>
           }
        </Box>
    )
}

export default PostDetail
