import React from 'react';
import useList from "./useList";
import {renderHook} from "@testing-library/react-hooks"
import { act } from 'react-test-renderer';
describe("useList", ()=>{
    it("should return initialState in list", ()=>{
     const {result} = renderHook(()=>useList({initialValues:["react"]}));
     expect(result.current.list).toEqual(["react"])
    })

    it("should add new item in list", ()=>{
        const {result} = renderHook(()=>useList({initialValues:["react"]}));
        act(()=>{
            result.current.add("mobx");
        })
       
        expect(result.current.list).toEqual(["react","mobx"])
    })

    it("should remove item from a list", ()=>{
        const {result} = renderHook(()=>useList({initialValues:["react","mobx"]}));
        act(()=>{
            result.current.remove(1);
        })
       
        expect(result.current.list).toEqual(["react"])
    })
})