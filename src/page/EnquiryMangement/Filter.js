import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faTrash,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Row,
  Col,
  Badge,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { CgUserList } from "react-icons/cg";

const Filter = ({ onFilter }) => {
  //FILTER
  const [query, setQuery] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const handleSearch = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onFilter(newQuery, filterValue);
  };

  const handleFilterSelect = (event) => {
    const newFilterValue = event.target.value;
    setFilterValue(newFilterValue);
    onFilter(query, newFilterValue);
  };
  return (
    <>
      <div>
        <div className="">
          <Form.Select
            className="ms-auto search_inp filter"
            aria-label="Default select example"
            name=""
            onChange={handleFilterSelect}
          >
            <option
              style={{ backgroundColor: "#40536e" }}
              value=""
              className=" text-white"
            >
              All
            </option>
            <option>New</option>
            <option>Pending</option>
            <option>Active</option>
            <option>Converted</option>
            <option>Blocked</option>
          </Form.Select>
        </div>
      </div>
    </>
  );
};

export default Filter;
