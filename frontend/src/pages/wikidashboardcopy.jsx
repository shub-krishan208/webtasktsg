// src/pages/WikiDashboard.jsx

import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";

const WikiDashboard = () => {
  return (
    <Container fluid="lg" className="py-4">
      <header className="mb-4">
        <h1>Wikipedia Page Dashboard</h1>
        <p className="text-muted">
          Enter a Wikipedia page title to get its stats.
        </p>
        <Form>
          <Row>
            <Col md={10}>
              <Form.Control
                type="text"
                placeholder="Enter a Wikipedia Page Title (e.g., Albert Einstein)"
              />
            </Col>
            <Col md={2}>
              <Button variant="primary" type="submit" className="w-100">
                Fetch Stats
              </Button>
            </Col>
          </Row>
        </Form>
      </header>

      <main>
        {/* We will show this section conditionally later */}
        <Card>
          <Card.Header as="h4">Page Title Placeholder</Card.Header>
          <Card.Body>
            <Row>
              {/* Left Column: Image and Summary */}
              <Col md={3}>
                <Card.Img
                  variant="top"
                  src="https://via.placeholder.com/300"
                  className="mb-3"
                />
                <h5>Summary</h5>
                <Card.Text>
                  This is a placeholder for the first paragraph of the article.
                </Card.Text>
              </Col>

              {/* Right Column: Stats and Lists */}
              <Col md={9}>
                <h5>Page Statistics</h5>
                <Row xs={2} md={4} className="g-3 mb-4 text-center">
                  <Col>
                    <Card bg="light">
                      <Card.Body>
                        <Card.Title>--</Card.Title>
                        <Card.Text>Page ID</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card bg="light">
                      <Card.Body>
                        <Card.Title>--</Card.Title>
                        <Card.Text>Languages</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card bg="light">
                      <Card.Body>
                        <Card.Title>--</Card.Title>
                        <Card.Text>Last Edited</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card bg="light">
                      <Card.Body>
                        <Card.Title>--</Card.Title>
                        <Card.Text>Unique Editors</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <h5>Pages Linked From Here</h5>
                    <ListGroup
                      style={{ maxHeight: "200px", overflowY: "auto" }}
                    >
                      <ListGroup.Item>Placeholder Link 1</ListGroup.Item>
                      <ListGroup.Item>Placeholder Link 2</ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col md={6}>
                    <h5>Pages Linking Here</h5>
                    <ListGroup
                      style={{ maxHeight: "200px", overflowY: "auto" }}
                    >
                      <ListGroup.Item>Placeholder Backlink 1</ListGroup.Item>
                      <ListGroup.Item>Placeholder Backlink 2</ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </main>
    </Container>
  );
};

export default WikiDashboard;
