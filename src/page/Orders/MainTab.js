import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Tab.css";
import Table from "./Table";
import AllocationTable from "./allocation/AllocationTable";

export default function MainTab() {
  const [toggle, setToggle] = useState(1);

  const toggleTab = (index) => {
    setToggle(index);
  };

  return (
    <Container className="main-tab">
      <Row className="head-row">
        <Col md={2} className="p-0">
          <h5 className="m-0">Orders </h5>
        </Col>

        <Col md={6} className="p-0">
          <Row>
            <Col md={4}></Col>
            <Col md={4}>
              <div
                onClick={() => toggleTab(1)}
                className={`${toggle === 1 ? "tab active-tab" : "tab"}`}
              >
                New Orders
              </div>
            </Col>
            <Col md={4}>
              <div
                onClick={() => toggleTab(2)}
                className={`${toggle === 2 ? "tab active-tab" : "tab"}`}
              >
                Allocation
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <div className="contents">
        <div
          className={`${toggle === 1 ? "content active-content" : "content"}`}
        >
          <Table />
        </div>

        <div
          className={`${toggle === 2 ? "content active-content" : "content"}`}
        >
          <AllocationTable />
        </div>
      </div>
    </Container>
  );
}
