import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './router';
import { ConfigProvider } from 'zarm';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';

function App() {
  return (
      <Router>
        <ConfigProvider locale={zhCN}>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                exact
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
        </Routes>
        </ConfigProvider>
      </Router>
  );
}

export default App;
