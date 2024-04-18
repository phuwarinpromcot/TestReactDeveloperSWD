import { useTranslation } from "react-i18next";
import { TaskBox } from "../component/task-box";
import { Link } from "react-router-dom";
import "../styles/scss/index.scss";
import { Col, Row } from "antd";

export const HomePage = () => {
  const { t } = useTranslation();
  return (
    <div className="task">
      <Row>
        <Col>
          <Link to="/test1" style={{ textDecoration: "none" }}>
            <TaskBox title={t("title1")} subTitle={t("subTitle1")}></TaskBox>
          </Link>
        </Col>
        <Col>
          <Link to="/test2" style={{ textDecoration: "none" }}>
            <TaskBox title={t("title2")} subTitle={t("subTitle2")}></TaskBox>
          </Link>
        </Col>
      </Row>
    </div>
  );
};
