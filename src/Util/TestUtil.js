import { QueryClientProvider, QueryClient} from "react-query";
import { ChakraProvider, CSSReset, ColorModeScript, theme } from "@chakra-ui/react"
import { Router } from 'react-router-dom'
import {createMemoryHistory} from "history";
import React from "react";
import { render as RTL, screen, waitForElementToBeRemoved } from "@testing-library/react";
const queryClient = new QueryClient();
const history = createMemoryHistory();


const render = (component, option={}) =>{
    return RTL(
        <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <CSSReset />
          <Router history={history}>
            {/* <ReactQueryCacheProvider queryCache={queryCache}> */}
            <QueryClientProvider client={queryClient} >
            {component} 
            </QueryClientProvider>
            {/* </ReactQueryCacheProvider> */}
          </Router>
        </ChakraProvider>
        
        ,option)
 }
 
 const renderWithoutRouter = (component, option={}) =>{
    return RTL(
        <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <CSSReset />
            {/* <ReactQueryCacheProvider queryCache={queryCache}> */}
            <QueryClientProvider client={queryClient} >
            {component} 
            </QueryClientProvider>
            {/* </ReactQueryCacheProvider> */}
        </ChakraProvider>
        
        ,option)
 }


 export {render, renderWithoutRouter}