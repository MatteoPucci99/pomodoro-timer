import { useState } from "react"
import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { setSettingsAction } from "../../redux/actions"


const Settings = (props)=>{

   const dispatch = useDispatch()
    const [settings,setSettings] = useState({
        Pomodoro: null,
        ShortBreak: null,
        LongBreak: null,
    })

    const handleInputChange  = (e,field)=>{
        setSettings({
            ...settings, [field]: e.target.value
        })

    }

    const handleForm = (e)=>{
        e.preventDefault()
        dispatch(setSettingsAction(settings))

    }

    return (
      <>
        <Modal show={props.modalState} onHide={()=>props.closeModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleForm}>
                <Modal.Body>
                    <Container fluid>
                        <Row>
                            <Col>
                                <label className="fw-bold text-secondary">Pomodoro</label>
                                <input className="inputModal" type="number" onChange={(e)=>handleInputChange(e,'Pomodoro')}></input>
                            </Col>
                            <Col>
                                <label className="fw-bold text-secondary">Short Break</label>
                                <input  className="inputModal" type="number" onChange={(e)=>handleInputChange(e,'ShortBreak')}></input>
                            </Col>
                            <Col>
                                <label className="fw-bold text-secondary">Long Break</label>
                                <input className="inputModal" type="number" onChange={(e)=>handleInputChange(e,'LongBreak')}></input>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={()=>props.closeModal(false)}>
                        Save 
                    </Button>
                </Modal.Footer>
            </form>
           
      </Modal>
      </>
    )
}

export default Settings