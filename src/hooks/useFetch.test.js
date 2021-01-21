import React from "react";
import useFetch from "./useFetch";
import { renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { setupServer } from "msw/node";

const TODOURL = "https://jsonplaceholder.typicode.com/todos";
const POSTURL = "https://jsonplaceholder.typicode.com/posts";
const server = setupServer(
  rest.get(TODOURL, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          completed: false,
          id: 1,
          title: "delectus aut autem",
          userId: 1,
        },
        {
          completed: false,
          id: 2,
          title: "quis ut nam facilis et officia qui",
          userId: 1,
        },
      ])
    );
  }),

  rest.get(POSTURL, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          body: "quia et suscipit",
          id: 1,
          title:
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          userId: 1,
        },
        {
          body: "est rerum tempore vitae",
          id: 2,
          title: "qui est esse",
          userId: 1,
        },
      ])
    );
  })
);

describe("useFetch", () => {
  beforeAll(() => server.listen());

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers());

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  it("should be able to make api call of given end point", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch({
        URL: TODOURL,
      })
    );
    await waitForNextUpdate();
    expect(result.current.data).toMatchInlineSnapshot(`
      Array [
        Object {
          "completed": false,
          "id": 1,
          "title": "delectus aut autem",
          "userId": 1,
        },
        Object {
          "completed": false,
          "id": 2,
          "title": "quis ut nam facilis et officia qui",
          "userId": 1,
        },
      ]
    `);
  });

  it("When url is changed make api call to changed endpoint", async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(
      ({ URL }) =>
        useFetch({
          URL,
        }),
      {
        initialProps: {
          URL: TODOURL,
        },
      }
    );
    await waitForNextUpdate();

    rerender({
      URL: POSTURL,
    });

    await waitForNextUpdate();
    expect(result.current.data).toMatchInlineSnapshot(`
      Array [
        Object {
          "body": "quia et suscipit",
          "id": 1,
          "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          "userId": 1,
        },
        Object {
          "body": "est rerum tempore vitae",
          "id": 2,
          "title": "qui est esse",
          "userId": 1,
        },
      ]
    `);
  });
});
