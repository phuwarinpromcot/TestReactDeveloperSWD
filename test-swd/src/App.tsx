import React from "react";
import "./styles/scss/index.scss";
import { DownOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Space } from "antd";
import { useTranslation } from "react-i18next";
import { HomePage } from "./pages/HomePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Test1Page } from "./pages/Test1Page";
import { Test2Page } from "./pages/Test2Page";


function App() {
  const { t, i18n } = useTranslation();
  

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const menu = (
    <Menu onClick={({ key }) => changeLanguage(key)}>
      <Menu.Item key="th">{t("th")}</Menu.Item>
      <Menu.Item key="en">{t("en")}</Menu.Item>
    </Menu>
  );

  const languageText = i18n.language === "th" ? t("th") : t("en");

  return (
    <div className="App">
      <Router>
        <div className="dropdown">
          <Dropdown overlay={menu} trigger={["click"]}>
            <button
              className="dropdown-button"
              onClick={(e) => e.preventDefault()}
            >
              <Space>
                <span>{languageText}</span>
                <DownOutlined />
              </Space>
            </button>
          </Dropdown>
          
        </div>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test1" element={<Test1Page />} />
          <Route path="/test2" element={<Test2Page />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
