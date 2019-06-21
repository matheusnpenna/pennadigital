import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { routes } from './config';

function AppRouter() {
  return (
    <Router>
      <div>
        <div class="sidebar">
          <ul>
            <li>
              <Link to="/">{routes.home.name}</Link>
            </li>
            <li>
              <Link to="/newpost/">{routes.newPost.name}</Link>
            </li>
          </ul>
        </div>

        <Route path={routes.home.path} exact component={routes.home.component} />
        <Route path={routes.newPost.path} component={routes.newPost.component} />
      </div>
    </Router>
  );
}

export default AppRouter;