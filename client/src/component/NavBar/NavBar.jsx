import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import "./NavBar.css";
import { CiSearch } from "react-icons/ci";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Profile from "../Profile/profile";
import { useState } from "react";

function NavBar({ userInfo, searchApi, getUser }) {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search) {
      searchApi(search);
      setSearch("");
    }
  };

  return (
    <Row className="row-main">
      <Navbar expand="lg" className="nav-container">
        <Container fluid>
          <Col>
            <Navbar.Brand href="#" className="brand-nav">
              Welcome &nbsp;
              <span
                style={{
                  color: "rgb(0, 127, 115)",
                }}
              >
                {userInfo?.username}
              </span>
            </Navbar.Brand>
          </Col>
          <Navbar.Toggle className="toggler" aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Col>
              <Row>
                <Col xs={8} className="main-col-below-profile">
                  <Form
                    onSubmit={handleSearch}
                    className="d-flex ms-auto align-items-center search-navbar"
                    style={{
                      border: "1px solid  rgba(0, 0, 0,0.2)",
                      borderRadius: "20px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <Form.Control
                      className="search-text"
                      type="search"
                      placeholder="Search Task"
                      aria-label="Search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{
                        border: "0px",
                        borderTopLeftRadius: "20px",
                        borderBottomLeftRadius: "20px",
                      }}
                    />
                    <Button
                      type="submit"
                      variant="outline"
                      className="search-button"
                      style={{
                        borderLeft: "1px solid  rgba(0, 0, 0,0.2)",
                        borderTopRightRadius: "20px",
                        borderBottomRightRadius: "20px",
                      }}
                    >
                      <CiSearch className="search-icon-navbar" />
                    </Button>
                  </Form>
                </Col>

                <Col
                  className="above-toggler-profile me-auto"
                  style={{
                    textAlign: "end",
                  }}
                >
                  <Profile getUser={getUser} userInfo={userInfo} />
                </Col>
              </Row>
            </Col>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Row>
  );
}

export default NavBar;
