import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Timer from "./components/Timer";

function App() {
  return (
    <Container fluid id="mainContainer">
      <Row className="row-cols-1">
        <Col className="text-center mt-4">Navbar with report and settings</Col>
        <Col className="text-center mt-4">
          <Timer />
        </Col>
        <Col className="text-center mt-4">Tasks section</Col>
      </Row>
    </Container>
  );
}

export default App;
