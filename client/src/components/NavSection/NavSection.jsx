import { useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import Settings from "./Settings"
import { IoIosSettings } from "react-icons/io";
import { BiSolidBarChartSquare } from "react-icons/bi";



const NavSection= ()=>{

    const [showmodal, setShowModal] = useState(false)
    const handleShowModal = ()=>setShowModal(true)
    const handleClosemodal = (input) => setShowModal(input)


    return (
        <Container>
            <Row className="justify-content-end">
                <Col className="col-2 d-flex align-items-center justify-content-center p-1 me-2" style={{cursor:'pointer', backgroundColor:'#8b63abff'}}>
                    <BiSolidBarChartSquare className="me-1" style={{fontSize:'1.3em'}} /><span>Report</span>
                </Col>
                <Col className="col-2 d-flex align-items-center justify-content-center p-1" style={{cursor:'pointer', backgroundColor:'#8b63abff'}} onClick={handleShowModal} >
                     <IoIosSettings className="me-1" style={{fontSize:'1.3em'}}  /><span>Setting</span>
                </Col>
            </Row>
            <Row>
                <Settings modalState={showmodal} closeModal={handleClosemodal}/>
            </Row>
        </Container>
    )
}

export default NavSection