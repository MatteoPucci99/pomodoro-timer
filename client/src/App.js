import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Timer from "./components/TimerSection/Timer";
import NavSection from "./components/NavSection/NavSection";

function App() {
  return (
    <Container fluid id="mainContainer">
      <Container fluid className="w-50">
        <Row className="row-cols-1">
          <Col className="text-center mt-5">
            <NavSection />
          </Col>
          <Col className="text-center mt-5">
            <Timer />
          </Col>
          <Col className="text-center mt-4">Tasks section</Col>
        </Row>
      </Container>
    </Container>
  );
}

export default App;
