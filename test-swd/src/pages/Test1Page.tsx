import { useTranslation } from "react-i18next";
import "../styles/scss/test1.scss";
import { Row, Col } from "antd";
import React, { useState } from "react";

export const Test1Page = () => {
  const { t } = useTranslation();
  const [shapes, setShapes] = useState([
    "square",
    "circle",
    "oval ",
    "trapezoid",
    "rectangle",
    "parallelogram",
  ]);

  const moveShape = (direction: string) => {
    const newShapes = [...shapes];
    if (direction === "left") {
      const movedShape: string | undefined = newShapes.shift();
      if (movedShape) {
        newShapes.push(movedShape);
      }
    } else if (direction === "right") {
      const movedShape: string | undefined = newShapes.pop();
      if (movedShape) {
        newShapes.unshift(movedShape);
      }
    }
    setShapes(newShapes);
  };

  const swapShapes = () => {
    const newShapes = [...shapes];
    const firstRow = newShapes.slice(0, newShapes.length / 2);
    const secondRow = newShapes.slice(newShapes.length / 2);

    setShapes([...secondRow, ...firstRow]);
  };

  const randomShapes = () => {
    const shape = [...shapes]; 
    for (let i = shape.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shape[i], shape[j]] = [
        shape[j],
        shape[i],
      ];
    }
    setShapes(shape); 
  };

  return (
    <div className="task">
      <h4 className="titleTest1">{t("subTitle1")}</h4>
      <div className="buttonsControl">
        <Row justify="space-between">
          <Col>
            <button
              className="button button-1"
              onClick={() => moveShape("left")}
            >
              <div className="arrow-left"></div>
              <span className="text">{t("moveShape")}</span>
            </button>
          </Col>
          <Col>
            <button className="button">
              <Row
                justify="space-evenly"
                className="button-2"
                onClick={swapShapes}
              >
                <div className="arrow-up"></div>
                <div className="arrow-down"></div>
              </Row>
              <span className="text">{t("movePosition")}</span>
            </button>
          </Col>
          <Col>
            <button
              className="button button-3"
              onClick={() => moveShape("right")}
            >
              <div className="arrow-right"></div>
              <span className="text">{t("moveShape")}</span>
            </button>
          </Col>
        </Row>
      </div>
      <div>
        <Row justify="end">
          {shapes.slice(0, shapes.length / 2).map((shape, index) => (
            <Col key={index}>
              <button className="button button-1" onClick={randomShapes}>
                <div className={shape}></div>
              </button>
            </Col>
          ))}
        </Row>
        <Row justify="center">
          {shapes.slice(shapes.length / 2).map((shape, index) => (
            <Col key={index}>
              <button className="button button-1" onClick={randomShapes}>
                <div className={shape}></div>
              </button>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
