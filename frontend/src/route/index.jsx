import { Route, Routes } from "react-router-dom";

import { RouterMap } from "./router.js";

import React, { Component } from "react";

export default class AppRouter extends Component {
  render() {
    return (
      <React.Suspense fallback="<div> Testing </div>">
        <Routes>
          {RouterMap.map(({ path, component:Component, children = [] }, index) => {
            if (children.length > 0) {

              return (
                <Route key={path} path={path} {...this.props} element={<Component />}>
                  {children.map(({ path, component: Child, index = false  }, i) => {
                    return    <Route key={path+Child}  path={path} index={index} {...this.props} element={<Child/>}  />
                    
                  })}
                </Route>
              );
            } else {
              return <Route key={path} path={path} element={<Component />} />;
            }
          })}
        </Routes>
      </React.Suspense>
    );
  }
}
