import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider, Layout } from "antd";
import { theme } from "./utils/theme";
import { Content } from "antd/es/layout/layout";
import Router from "./router/router";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={theme}>
        <Layout>
          <Content style={{ width: "100%", maxWidth: 1440, margin: "0 auto" }}>
            <Router />
          </Content>
        </Layout>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
