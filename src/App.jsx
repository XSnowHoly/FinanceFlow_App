import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './router';
import { ConfigProvider } from 'zarm';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';
import NavBar from '@/components/NavBar';

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
        <NavBar showNav={true} />
      </Router>
  );
}

export default App;
