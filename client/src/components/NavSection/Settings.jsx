import { useState } from "react"
import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { setSettingsAction } from "../../redux/actions"


const Settings = (props)=>{

    const initialSettings = useSelector(state=>state.settings.content)
    const dispatch = useDispatch()
    const [settings,setSettings] = useState({
        Pomodoro: initialSettings.Pomodoro,
        ShortBreak: initialSettings.ShortBreak,
        LongBreak: initialSettings.LongBreak,
    })

    //Funzione per gestire lo stato settings in base alle impostazioni clickate passo il field (categoria delle impostazioni) e l'evento
    const handleInputChange  = (e,field)=>{   
        if(e.target.value > 0){
            setSettings({
                ...settings, [field]: e.target.value
            })
        }
    }
    //Funzione per gestire il form (impedisco il comportamento di default del form e "dispatcho" i dati salvati creando un nuovo store redux con quei settings)
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
                                <input className="inputModal" type="number" value={settings.Pomodoro} onChange={(e)=>handleInputChange(e,'Pomodoro')}></input>
                            </Col>
                            <Col>
                                <label className="fw-bold text-secondary">Short Break</label>
                                <input  className="inputModal" type="number" value={settings.ShortBreak} onChange={(e)=>handleInputChange(e,'ShortBreak')}></input>
                            </Col>
                            <Col>
                                <label className="fw-bold text-secondary">Long Break</label>
                                <input className="inputModal" type="number" value={settings.LongBreak} onChange={(e)=>handleInputChange(e,'LongBreak')}></input>
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