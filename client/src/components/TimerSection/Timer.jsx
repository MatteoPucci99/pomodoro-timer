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
        <>
            <Container className="d-flex justify-content-center py-4" style={{backgroundColor:'#8b63abff', borderRadius: '7px'}}>
                <Row className="row-cols-1 justify-content-center flex-column">
                    <Col className="d-flex justify-content-evenly align-items-center">
                        <div onClick={()=>{handleSettings(settings.Pomodoro); handleSelected('Pomodoro')}} style={{cursor:'pointer', width:'25%'}} className={selected ==='Pomodoro' ? 'selectedType' : null}>
                            Pomodoro
                        </div>
                        <div onClick={()=>{handleSettings(settings.ShortBreak); handleSelected('ShortBreak')}} style={{cursor:'pointer', width:'25%'}} className={selected ==='ShortBreak' ? 'selectedType' : null}>
                            Short Break
                        </div>
                        <div onClick={()=>{handleSettings(settings.LongBreak); handleSelected('LongBreak')}} style={{cursor:'pointer', width:'25%'}} className={selected ==='LongBreak' ? 'selectedType' : null}>
                            Long Break
                        </div>
                    </Col>
                    <Col className="mt-3">
                        <CountDown timerSettings={timerSettings} option={selected}/>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col className="fw-bold mt-4 fs-4" >
                        {selected === 'Pomodoro' ? <span>Time to focus !</span> : <span>Time for a break !</span>}
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default Timer