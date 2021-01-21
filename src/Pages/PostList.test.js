import React, { Component } from "react";
import PostList from "./PostList";
import * as reactQuery from "react-query";
import { render as RTL, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { useColorMode, useTheme } from "@chakra-ui/react";
import {render} from "../Util/TestUtil";
import { rest } from 'msw';

import { setupServer } from 'msw/node';

const server = setupServer(
    rest.get("http://localhost:3002/posts", (req, res, ctx) => {
      return res(ctx.json([{ id: 1, title: "Api Dummy Title" }]))
    }),
  )
 
  


// Arrange Act Assertion
describe("PostList", () => {
  let useQuery = null;
  beforeAll(() => {
    useQuery = jest.spyOn(reactQuery, "useQuery");
    server.listen()
  });
  beforeEach(() => {
    server.resetHandlers()  
    useQuery.mockClear();
  });
  afterAll(()=>{
   server.close()
  })
  it("when is Loading is true loading text should be display", () => {
    // useQuery.mockRestore()
    //Arrange
    useQuery.mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    useColorMode.mockReturnValue({ colorMode: "light" });
    useTheme.mockReturnValue({});

    // Act
    render(
       
    <PostList isDrawerOpen={false} closeDrawer={jest.fn()} />
    
    );

    // Assertion
    const text = screen.getByTestId("loading-text");

    //queryBy---ift not text return null
    //get By -- if not text then break
    // find by --- api render in dom
    expect(text).toHaveTextContent("Loading...");
  });

  it("when isLoading is false and data exit render list of data", () => {
    //Arrange
    useQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: {
        data: [{ id: 1, title: "Dummy Title" }],
      },
    });

    useColorMode.mockReturnValue({ colorMode: "light" });
    useTheme.mockReturnValue({});

    // Act
    render(
     
       
        <PostList isDrawerOpen={false} closeDrawer={jest.fn()} />
     
     
    );

    const data = screen.getAllByTestId("list-item").map((li) => li.textContent);

    expect(data).toMatchInlineSnapshot(`
      Array [
        "Dummy Title",
      ]
    `);
  });

  it("When api call made to post end point",async()=>{

    useQuery.mockRestore();
       //Arrange
    useQuery.mockReturnValue({
        isLoading: false,
        error: null,
        data: {
          data: [{ id: 1, title: "Dummy Title" }],
        },
      });
  
      useColorMode.mockReturnValue({ colorMode: "light" });
      useTheme.mockReturnValue({});
      
       // Act
    render(
        
          <PostList isDrawerOpen={false} closeDrawer={jest.fn()} />
        
      );

      await waitForElementToBeRemoved(()=>screen.getByTestId("loading-text"))
      const data = screen.getAllByTestId("list-item").map((li) => li.textContent);
      expect(data).toMatchInlineSnapshot(`
      Array [
        "Api Dummy Title",
      ]
    `);
  });
     
  });

  

