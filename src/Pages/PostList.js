import { List, ListItem, ListIcon, Link, Box,  Drawer,DrawerBody,DrawerFooter,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton, Button,Input, useDisclosure, useColorMode, useTheme } from "@chakra-ui/react"
import React,{useEffect, useState} from 'react'
import {Get} from "../Util/JsonUtil" 
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from "react-query";


const PostList = ({isDrawerOpen, closeDrawer}) => {
    
    // const [list, setList]= useState([])
    // const [loading, setLoding]= useState(true)
  
 
    const {isLoading, error, data} = useQuery("postList", ()=>{
        return Get("http://localhost:3002/posts");
    })

   

    const {colorMode}  = useColorMode()
    const theme  = useTheme()
    // const getPostList=()=>{
    //     Get("http://localhost:3002/posts").then(res=>{
    //         console.log(res)
    //         setLoding(false)
    //         setList(res.data)
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    // }
    
    // useEffect(()=>{
    //     //getPostList()
    // },[])
    return (

    
        <Box w={{
            sm:"0",
            md:"20%",
            
        }} h="100%">
            {isLoading?(
              <div data-testid="loading-text">Loading...</div>
              )
            :
            (
                <List d={{
                    sm:"none",
                    md:"block",
                   
                }} h="100%" 
                borderRight={colorMode=="dark"?`1px solid ${theme.colors.gray["700"]}`:"1px solid #ccc "} >
                    {data.data.map(data=>(
                <ListItem data-testid="list-item" key={data.id}>
                    <Link padding=".8rem" display="flex" as={RouterLink} to={`/posts/${data.id}`}>{data.title}</Link>
                    </ListItem>
            ))}</List>
            )}
           <Drawer
        isOpen={isDrawerOpen}
        placement="left"
        onClose={closeDrawer}
        
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Blog List</DrawerHeader>

            <DrawerBody>
              {data?data.data.map(data=>(
                <ListItem listStyleType="none" key={data.id}>
                    <Link padding=".8rem" display="flex" as={RouterLink} to={`/posts/${data.id}`}>{data.title}</Link>
                    </ListItem>
            )):null}
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={closeDrawer}>
                Cancel
              </Button>
             
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
           
        </Box>
    )
}

export default PostList
