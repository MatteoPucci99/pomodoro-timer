import { useEffect, useState } from "react";
import {  Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { saveSessionAction } from "../../redux/actions";
import { IoPlaySkipForward } from "react-icons/io5";



const CountDown = (props)=>{

    const dispatch = useDispatch()
    const [minutes, setMinutes] = useState(props.timerSettings);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false)
    const [isPressed, setIsPressed] = useState(false)
    const [session, setSession] = useState(
      {
        date: new Date(),
        seconds: 0
      }
    )


    useEffect(() => {
      setMinutes(parseInt(props.timerSettings));
      setSeconds(0);
    }, [props.timerSettings]);
  
    useEffect(() => {
      let timer;
      if ( isRunning && minutes >= 0 && seconds >= 0) {
        timer = setInterval(() => {
          setSession((prevSession) => ({
            ...prevSession,
            seconds: prevSession.seconds + 1
          }));
          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(timer);
              // Fai qualcosa quando il timer raggiunge zero
              props.handleSelected('ShortBreak')
              setIsPressed(false)
              setIsRunning(false)
              setMinutes(props.timerSettings)
              setSeconds(0)
              dispatch(saveSessionAction(session, handleTrackReset))
            } else {
              setMinutes((prevMinutes) => prevMinutes - 1);
              setSeconds(59);
            }
          } else {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }
        }, 1000);
      }
  
      return () => clearInterval(timer);
    }, [isRunning, minutes, seconds]);

  
    const formatTime = (value) => (value < 10 ? `0${value}` : value);
    const handleTimer = () => setIsRunning(!isRunning);
    const handlePressButton = ()=> setIsPressed(!isPressed)
    const handleTrackReset = ()=>{
      setSession({
        date: new Date(),
        seconds: 0
      });
    }
    const handleClickTimer = ()=>{
      if(isPressed && props.option === 'Pomodoro'){
        console.log('Invio i dati al server !')
        dispatch(saveSessionAction(session,handleTrackReset))

      }
    }

    const handleArrowSwitch = ()=>{
      props.handleSelected('ShortBreak')
      setIsPressed(false)
      setIsRunning(false)
      dispatch(saveSessionAction(session, handleTrackReset))
    }
   

  

    return (
        <Container>
            <Row className="row-cols-1">
                <Col>
                    <span id="timerContent">{`${formatTime(minutes)}:${formatTime(seconds)}`}</span>
                </Col>
                <Col className='position-relative'>
                    <button onClick={()=>{handleTimer();handlePressButton();handleClickTimer()}} id="buttonTimer" style={{borderBottom: isPressed ? 'none' : '6px solid #cecece'}}>
                        {isRunning ? 'PAUSE' : 'START'}
                    </button>
                    {isRunning && props.option === 'Pomodoro' && (<IoPlaySkipForward style={{fontSize:'2em', cursor:'pointer'}} className='position-absolute ms-5 top-50' onClick={handleArrowSwitch} />)}
                </Col>
        
            </Row>
        </Container>
        

    )
}

export default CountDown