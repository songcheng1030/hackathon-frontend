import './App.scss';

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { routes } from "./routes";
import WithScrollTop from "./wrappers/ScrollTop";
import store from './store';
import { UserContext, UserContextProvider } from './contexts/UserContext';

import Layout from './components/Layout';
import MobileMenu from './components/MobileMenu';
import { rafflesService } from './services';
import { AuthGuard } from "./guards";

const App = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  return (
    <Provider store={store}>
      <UserContextProvider>
        <Router>
          <WithScrollTop>
            <AuthGuard authorized>
              <Route
                path={[...routes.dashboard.map(({ path }) => path)]}
                component={(props: any) => (
                  <Layout {...props}>
                    <Switch {...props}>
                      {routes.dashboard.map((route, idx) => {
                        return (
                          <Route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            component={(props: any) => (
                              <route.component {...props} key={idx} />
                            )}
                          />
                        )
                      })}
                    </Switch>
                  </Layout>
                )}
              />
            </AuthGuard>

            <AuthGuard authorized={false}>
              <Route
                path={[...routes.minimal.map(({ path }) => path)]}
                component={(props: any) => (
                  <Layout {...props}>
                    <Switch {...props}>
                      {routes.minimal.map((route, idx) => (
                        <Route
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          component={(props: any) => (
                            <route.component {...props} key={idx} />
                          )}
                        />
                      ))}
                    </Switch>
                  </Layout>
                )}
              />
            </AuthGuard>
            {isMenuOpened && <MobileMenu onClose={() => setIsMenuOpened(false)} />}
          </WithScrollTop>
        </Router>
      </UserContextProvider>
    </Provider>
  );
};

export default App;
