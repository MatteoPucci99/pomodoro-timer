import { useEffect, useState } from "react";
import {  Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { saveSessionAction } from "../../redux/actions";
import { IoPlaySkipForward } from "react-icons/io5";



const CountDown = (props)=>{

    const dispatch = useDispatch()
    const [minutes, setMinutes] = useState(props.timerSettings);
    const [seconds, setSeconds] = useState(0);
    //Stato per gestire lo stato di Start e Pause del timer insieme alla variazione di stile nel momento in cui si preme il bottone
    const [isRunning, setIsRunning] = useState(false)
    //Oggetto session da mandare al server
    const [session, setSession] = useState(
      {
        date: new Date(),
        seconds: 0
      }
    )

    //Quando in Timer si passa da Pomodoro alle fasi di break, vengono aggiornati i minuti e i secondi. 
    useEffect(() => {
      setMinutes((props.timerSettings));
      setSeconds(0);
    }, [props.timerSettings]);
  
    useEffect(() => {
      let timer;
      if ( isRunning && minutes >= 0 && seconds >= 0) {
        timer = setInterval(() => {
          setSession({
            ...session,
            seconds: session.seconds + 1
          });
          if (seconds === 0) {
            if (minutes === 0) {
              //Quando termina il timer fa queste cose
              clearInterval(timer);
              props.handleSelected('ShortBreak')
              setIsRunning(false)
              setMinutes(props.timerSettings)
              setSeconds(0)
              dispatch(saveSessionAction(session, handleTrackReset))
            } else {
              setMinutes(minutes - 1);
              setSeconds(59);
            }
          } else {
            setSeconds(seconds - 1);
          }
        }, 1000);
      }
  
      return () => clearInterval(timer);
    }, [isRunning, minutes, seconds]);

    //Funzione per mostrare i secondi nel formato 00 per numeri minori di 10
    const formatTime = (value) => (value < 10 ? `0${value}` : value);
    const handleTimer = () => setIsRunning(!isRunning);
    //Funzione per resettare lo stato ogni qual volta viene dispatchato l'azione saveSessionAction
    const handleTrackReset = ()=>{
      setSession({
        date: new Date(),
        seconds: 0
      });
    }
    //Funzione per gestire il click del timer
    const handleClickTimer = ()=>{
      if(isRunning && props.option === 'Pomodoro'){
        console.log('Invio i dati al server !')
        dispatch(saveSessionAction(session,handleTrackReset))

      }
    }
    //Funzione per gestire il passaggio rapido alla pausa mentre il timer è attivo
    const handleArrowSwitch = ()=>{
      props.handleSelected('ShortBreak')
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
                    <button onClick={()=>{handleTimer();handleClickTimer()}} id="buttonTimer" style={{borderBottom: isRunning ? 'none' : '6px solid #cecece'}}>
                        {isRunning ? 'PAUSE' : 'START'}
                    </button>
                    {isRunning && props.option === 'Pomodoro' && (<IoPlaySkipForward style={{fontSize:'2em', cursor:'pointer'}} className='position-absolute ms-5 top-50' onClick={handleArrowSwitch} />)}
                </Col>
        
            </Row>
        </Container>
        

    )
}

export default CountDown