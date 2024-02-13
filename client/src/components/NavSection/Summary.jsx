import { Col, Container, Row } from "react-bootstrap"
import { CiClock2 } from "react-icons/ci";
import { IoCalendarOutline } from "react-icons/io5";
import { BsFire } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useState } from "react";
import FocushoursChart from "./FocushoursChart";


const Summary = ()=>{
    
    const [isSelected, setIsSelected] = useState('Week')
    const handleSelectedButton = (input)=>setIsSelected(input)
    const session = useSelector(state=>state.sessions.content)

    const totalSeconds = session.reduce((acc,session) => acc + session.seconds, 0);
    const totalHours = (totalSeconds / 3600).toFixed(1)
    //Creo un array con solo le date (elimino l'ora)
    const sessionDates = session.map(session=> session.date.split('T')[0])
    //Elimino i doppioni che non servono nel calcolo dei giorni consecutivi. Set è un oggetto che garantisce che ci siano solo elementi unici
    const uniqueDate = new Set(sessionDates)
    //Con size ottengono il numero di elementi unici di un oggetto Set, quindi in questo caso i giorni totali di accesso
    const daysCount = uniqueDate.size
    //Siccome uniqueDate è un oggetto Set posso utilizzare direttamente lo spread operator, e ottenere un array di valori
    const uniqueDateList = [...uniqueDate]
 
    //Funzione per calcolare i giorni di accesso, la funzione riceverà l'array di giorni unici e verificherà l'esistenza dei consecutivi.
    //In caso non ci siano tornerà 1
    const countConsecutiveDays =(dates) => {
        let consecutiveDaysCount = 1;   
        for (let i = 1; i < dates.length; i++) {
          const currentDate = new Date(dates[i]);
          const previousDate = new Date(dates[i - 1]);
        
          if (
            currentDate.getDate() === previousDate.getDate() + 1 &&
            currentDate.getMonth() === previousDate.getMonth() &&
            currentDate.getFullYear() === previousDate.getFullYear()
          ) {
            consecutiveDaysCount++;
          } else {
            consecutiveDaysCount = 1;
          }
        }
      
        return consecutiveDaysCount ;
      }

      const consecutiveDays = countConsecutiveDays(uniqueDateList);

      
    

    return (
       <Container>
        <Row className="row-cols-1">
            <Col>
                <span className="fw-bold fs-5">Activity Summary</span>
                <Row className="mt-3">
                    <Col className="summaryCard me-3 position-relative">
                        <div className="sumTextContainer py-3">
                            <CiClock2 className="summaryIcon m-2"/>
                            <p className="mb-0 text-end fs-2">{totalHours}</p>
                            <p className="mb-0 text-end">hours focused</p>
                        </div>
                    </Col>
                    <Col className="summaryCard me-3 position-relative">
                        <div className="sumTextContainer py-3">
                            <IoCalendarOutline className="summaryIcon m-2"/>
                            <p className="mb-0 text-end fs-2">{daysCount}</p>
                            <p className="mb-0 text-end">day accessed</p>
                        </div>
                    </Col>
                    <Col className="summaryCard position-relative">
                        <div className="sumTextContainer py-3 ">
                            <BsFire className="summaryIcon m-2"/>
                            <p className="mb-0 text-end fs-2">{consecutiveDays}</p>
                            <p className="mb-0 text-end">day streak</p>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col className="mt-4">
                <span className="fw-bold fs-5">Focus Hours</span>
                <Row className="row-cols-1">
                    <Col className="text-center mt-3">
                        <button className={isSelected === 'Week' ? 'clickedReportButton' : 'reportButton'} id="weekButton" onClick={()=>handleSelectedButton('Week')}>Week</button>
                        <button className={isSelected === 'Month' ? 'clickedReportButton' : 'reportButton'} id="monthButton"  onClick={()=>handleSelectedButton('Month')}>Month</button>
                    </Col>
                    <Col>
                        <FocushoursChart selected={isSelected}/>
                    </Col>
                </Row>

            </Col>
        </Row>
       </Container>
    )
}

export default Summary