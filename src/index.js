import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, CSSReset, ColorModeScript, theme } from "@chakra-ui/react"
import { BrowserRouter as Router } from 'react-router-dom'
import {ReactQueryCacheProvider, QueryClientProvider} from "react-query";
import {queryCache, queryClient} from "./reactQuery"

const defaultTheme ={
  ...theme,
}



ReactDOM.render(


  <React.StrictMode>
    <ChakraProvider theme={defaultTheme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <CSSReset />
      <Router>
        {/* <ReactQueryCacheProvider queryCache={queryCache}> */}
        <QueryClientProvider client={queryClient} >
        <App />
        </QueryClientProvider>
        {/* </ReactQueryCacheProvider> */}
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
