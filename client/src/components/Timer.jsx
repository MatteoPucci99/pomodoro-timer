import { Col, Container, Row } from "react-bootstrap"
import CountDown from "./CountDown"



const Timer = ()=>{
    return (
        <Container className="d-flex justify-content-center">
            <Row className="row-cols-1 justify-content-center flex-column w-50">
                <Col className="d-flex justify-content-evenly">
                    <div>
                        Pomodoro
                    </div>
                    <div>
                        Short Break
                    </div>
                    <div>
                        Long Break
                    </div>
                </Col>
                <Col className="mt-3">
                    <CountDown/>
                </Col>
            </Row>
        </Container>
    )
}

export default Timer