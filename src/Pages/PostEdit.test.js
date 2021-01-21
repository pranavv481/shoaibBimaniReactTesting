import React from 'react';
import { renderWithoutRouter } from "../Util/TestUtil";
import PostEdit from "../Pages/PostEdit";
import { createMemoryHistory } from "history";
import { Route, Switch, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
    rest.post('http://localhost:3002/posts', (req, res, ctx) => {
    return res(ctx.json({message:"Post Created"}))
    }),
  )

describe("Post Edit", () => {
    beforeAll(()=>{
        server.listen()
    })
    beforeEach(()=>{
        server.resetHandlers()
    })
    afterAll(()=>{
        server.close()
    })
    it("should create post when valid title and desc is given", async() => {
        const history = createMemoryHistory(["/", "/posts"]);

          renderWithoutRouter(
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={PostEdit} />
                    <Route path="/posts" render={() => <div>post created</div>} />
                </Switch>
            </Router>
        )
      const title = screen.getByLabelText(/title/i)
       const desc =  screen.getByLabelText(/description/i)
       
       userEvent.type(title,"Dummy Title");
       userEvent.type(desc,"Dummy Desc");
       
       const button = screen.getByText(/Add Post/i);
       userEvent.click(button)
       await screen.findByText(/post created/i);
       expect(screen.getByText(/post created/i)).toBeInTheDocument()
    })
})

