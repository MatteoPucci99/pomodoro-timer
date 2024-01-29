import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Timer from "./components/TimerSection/Timer";
import NavSection from "./components/NavSection/NavSection";

function App() {
  return (
    <Container fluid id="mainContainer">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8} xl={7} id="content">
          <Row className="row-cols-1">
            <Col className="text-center mt-5">
              <NavSection />
            </Col>
            <Col className="text-center mt-5">
              <Timer />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
