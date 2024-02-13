import { useEffect, useState } from "react"
import { Col, Container, Modal, Row } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { getSessionsAction } from "../../redux/actions"
import Summary from "./Summary"
import Detail from "./Detail"


const Report = (props)=>{

    const dispatch = useDispatch()
    //Stato per gestire la visualizzazione del componente Summary o Detail e l'applicazione dello stile clickedReportButton
    const [isSelected, setIsSelected] = useState('Summary')

    const handleSelectedButton = (input)=>setIsSelected(input)

    //Ogni volta che si apre il modale (prop passata da NavSection) lo useEffect aggiorna i dati.
    useEffect(()=>{
        dispatch(getSessionsAction())
    },[props.modalState])

    return (
       <>
        <Modal show={props.modalState} onHide={()=>props.closeModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h3>Report</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center">
                <button className={isSelected === 'Summary' ? 'clickedReportButton' : 'reportButton'} id="summaryButton" onClick={()=>handleSelectedButton('Summary')}>Summary</button>
                <button className={isSelected === 'Detail' ? 'clickedReportButton' : 'reportButton'} id="detailButton" onClick={()=>handleSelectedButton('Detail')}>Detail</button>
            </Modal.Body>
            <Modal.Body>
               <Container>
                <Row className="row-cols-1">
                    {isSelected === 'Summary' ? (<Col> <Summary/> </Col>) : (<Col> <Detail/> </Col>)}                                      
                </Row>
               </Container>
            </Modal.Body>

      </Modal>
       </> 
    )
}

export default Report