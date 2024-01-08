import { useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import Settings from "./Settings"
import { IoIosSettings } from "react-icons/io";
import { BiSolidBarChartSquare } from "react-icons/bi";
import { GiTomato } from "react-icons/gi";
import Report from "./Report";



const NavSection= ()=>{

    const [showmodal, setShowModal] = useState(false)
    const [showmodal2, setShowModal2] = useState(false)
    const handleShowModal = ()=>setShowModal(true)
    const handleClosemodal = (input) => setShowModal(input)
    const handleShowModal2 = ()=>setShowModal2(true)
    const handleClosemodal2 = (input) => setShowModal2(input)


    return (
        <Container>
            <Row className="justify-content-between">
                <Col className="col-6 d-flex align-items-center">
                    <GiTomato style={{fontSize:'2em'}} className="me-2" /><h3 className="mb-0">TOMATO TIMER</h3>
                </Col>
                <Col className="col-4 d-flex">
                    <div className="d-flex align-items-center justify-content-center py-1 px-3 me-2" style={{cursor:'pointer', backgroundColor:'#8b63abff'}} onClick={handleShowModal2}>
                        <BiSolidBarChartSquare className="me-1" style={{fontSize:'1.3em'}} /><span>Report</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-center py-1 px-3" style={{cursor:'pointer', backgroundColor:'#8b63abff'}} onClick={handleShowModal} >
                        <IoIosSettings className="me-1" style={{fontSize:'1.3em'}}  /><span>Setting</span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Settings modalState={showmodal} closeModal={handleClosemodal}/>
                <Report modalState={showmodal2} closeModal={handleClosemodal2}/>
            </Row>
        </Container>
    )
}

export default NavSection