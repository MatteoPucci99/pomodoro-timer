import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";


const CountDown = ()=>{

    const [minutes, setMinutes] = useState(45);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false)
    //Successivamente lo stato verrà modificato dalla sezione settings in cui sarà possibile scegliere a quanti minuti impostare il timer.
    //In pratia i settings modificheranno i minuti di Pomodoro, Short Break e Long Break in modo che quando verranno selezionati l'utente accederà 
    // al timer con i minuti desiderati. Quindi sarà tipo Settings --> Pomodoro/Short Break/Long Break --> Timer --> CountDown. Penso una roba del genere
  
    useEffect(() => {
      let timer;
  
      if ( isRunning && minutes >= 0 && seconds >= 0) {
        timer = setInterval(() => {
          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(timer);
              // Fai qualcosa quando il timer raggiunge zero
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

    const handleTimer = ()=>setIsRunning(!isRunning)
  

    return (
        <Container>
            <Row className="row-cols-1">
                <Col>
                    <span id="timerContent">{`${formatTime(minutes)}:${formatTime(seconds)}`}</span>
                </Col>
                <Col>
                    <button onClick={handleTimer} id="buttonTimer">
                        {isRunning ? 'PAUSE' : 'START'}
                    </button>
                </Col>

            </Row>
        </Container>
        

    )
}

export default CountDown