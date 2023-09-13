import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  Modal,
  Pagination,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

function Dashboard() {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [usersList, setUsersList] = useState([]);
  const [userTableList, setUserTableList] = useState([]);
  const [active, setActive] = useState(1);
  const [dropdownValue, setDropdownValue] = useState(10);
  var pages = [];
  var dropdownLists = [];

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setSelectedUser(data);
    setShow(true);
  };

  const pagination = (number) => {
    setActive(number);
    const pageIndex = number - 1;
    const firstIndex = pageIndex * dropdownValue;
    const lastIndex = pageIndex * dropdownValue + dropdownValue;
    // console.log({ firstIndex });
    // console.log({ lastIndex });
    setUserTableList(usersList.slice(firstIndex, lastIndex));
  };

  for (let number = 1; number <= 5; number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => pagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  for (let number = 10; number <= 50; number += 10) {
    dropdownLists.push(
      <Dropdown.Item
        eventKey={number}
        key={number}
        active={number === dropdownValue}
        onClick={() => setDropdownValue(number)}
      >
        {number}
      </Dropdown.Item>
    );
  }

  const getAllUsers = () => {
    axios
      .get("http://localhost:4000/users")
      .then((res) => {
        setUsersList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUser = (id) => {
    // console.log(id);
    axios
      .post("http://localhost:4000/deleteUser", {
        deleteUserId: id,
      })
      .then((res) => {
        console.log(res);
        getAllUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editUser = (event, id) => {
    event.preventDefault();
    let data = {
      [event.target[0].name]: event.target[0].value,
      [event.target[1].name]: event.target[1].value,
      [event.target[2].name]: event.target[2].value,
    };
    // console.log(data);
    axios
      .post(`http://localhost:4000/editUser/${id}`, data)
      .then((res) => {
        console.log(res);
        handleClose();
        getAllUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .post("http://localhost:4000/dashboard", {
        userId: localStorage.getItem("user_id"),
      })
      .then((res) => {
        console.log(res);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    getAllUsers();
  }, []);

  useEffect(() => {
    const pageIndex = active - 1;
    const firstIndex = pageIndex * dropdownValue;
    const lastIndex = pageIndex * dropdownValue + dropdownValue;
    // console.log({ firstIndex });
    // console.log({ lastIndex });
    setUserTableList(usersList.slice(firstIndex, lastIndex));
  }, [active, dropdownValue, usersList]);

  return (
    <>
      <div>
        <h3>Dashboard</h3>
        <h4>
          Welcome {userData.firstName} {userData.lastName}
        </h4>

        <div>
          <Table responsive="sm" striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Active</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userTableList.map((item) => (
                <tr keys={item._id}>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.active ? "Active" : "No"}</td>
                  <td>
                    <div>
                      <Button size="sm" onClick={() => handleShow(item)}>
                        Edit
                      </Button>
                      {item.active ? (
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => deleteUser(item._id)}
                        >
                          Delete
                        </Button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="my-3">
          <div className="container d-flex justify-content-end">
            <Pagination size="sm" className="m-0">
              <Pagination.Prev
                onClick={() => {
                  if (active > 1) {
                    pagination(active - 1);
                  }
                }}
              />
              {pages}
              <Pagination.Next
                onClick={() => {
                  if (active < 5) {
                    pagination(active + 1);
                  }
                }}
              />
            </Pagination>
            <DropdownButton
              as={ButtonGroup}
              key="Primary"
              id={`dropdown-variants-Primary`}
              variant="primary"
              size="sm"
              title={dropdownValue.toString()}
              className="ms-3"
            >
              {dropdownLists}
            </DropdownButton>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => editUser(e, selectedUser._id)}>
            <div className="input-con">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                id="firstName"
                name="firstName"
                defaultValue={selectedUser?.firstName}
              />
            </div>
            <div className="input-con">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                id="lastName"
                name="lastName"
                defaultValue={selectedUser?.lastName}
              />
            </div>
            <div className="input-con">
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                placeholder="Enter your user name"
                id="userName"
                name="userName"
                defaultValue={selectedUser?.userName}
              />
            </div>
            <Button type="button" variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Dashboard;
