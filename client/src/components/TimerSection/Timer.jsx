import { Col, Container, Row } from "react-bootstrap"
import CountDown from "./CountDown"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"



const Timer = ()=>{

    const dispatch = useDispatch()
    const settings = useSelector(state=>state.settings.content)
    const [selected,setSelected] = useState('Pomodoro')
    const [timerSettings, setTimerSettings] = useState(settings.Pomodoro)


    useEffect(() => {
        if (selected === "Pomodoro") {
          setTimerSettings(settings.Pomodoro);
        } else if (selected === "ShortBreak") {
          setTimerSettings(settings.ShortBreak);
        } else {
          setTimerSettings(settings.LongBreak);
        }
      }, [selected, settings]);

 
    



    const handleSettings = (input) => setTimerSettings(input)
    const handleSelected = (input) => setSelected(input)

    return (
        <Container className="d-flex justify-content-center py-4 flex-column" style={{backgroundColor:'#8b63abff', borderRadius: '7px'}}>
                <Row className="row-cols-1 justify-content-center">
                    <Col>
                        <Row className="justify-content-evenly">
                            <Col xs={3} md={2} onClick={()=>{handleSettings(settings.Pomodoro); handleSelected('Pomodoro')}} style={{cursor:'pointer'}} className={selected ==='Pomodoro' ? 'selectedType fontColTimer' : 'fontColTimer'}>
                                Pomodoro
                            </Col>
                            <Col xs={3} md={2} onClick={()=>{handleSettings(settings.ShortBreak); handleSelected('ShortBreak')}} style={{cursor:'pointer'}} className={selected ==='ShortBreak' ? 'selectedType fontColTimer' : 'fontColTimer'}>
                                Short Break
                            </Col>
                            <Col xs={3} md={2} onClick={()=>{handleSettings(settings.LongBreak); handleSelected('LongBreak')}} style={{cursor:'pointer'}} className={selected ==='LongBreak' ? 'selectedType fontColTimer' : 'fontColTimer'}>
                                Long Break
                            </Col>

                        </Row>
                    </Col>
                    <Col className="mt-3">
                        <CountDown timerSettings={timerSettings} option={selected} handleSelected={handleSelected}/>
                    </Col>
                </Row>

                <Row>
                    <Col className="fw-bold mt-4 fs-4" >
                        {selected === 'Pomodoro' ? <span>Time to focus !</span> : <span>Time for a break !</span>}
                    </Col>
                </Row>
            </Container>
           

        
    )
}

export default Timer