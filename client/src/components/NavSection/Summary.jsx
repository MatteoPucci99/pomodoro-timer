import { Col, Container, Row } from "react-bootstrap"
import { CiClock2 } from "react-icons/ci";
import { IoCalendarOutline } from "react-icons/io5";
import { BsFire } from "react-icons/bs";
import { useSelector } from "react-redux";


const Summary = ()=>{

    const session = useSelector(state=>state.sessions.content)

    const totalSeconds = session.reduce((acc,session) => acc + session.seconds, 0);
    const totalHours = (totalSeconds / 3600).toFixed(1)

    const sessionDates = session.map(session=> session.date.split('T')[0])
    const uniqueDate = new Set(sessionDates)
    const daysCount = uniqueDate.size

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
      
        return consecutiveDaysCount + 1;
      }
    
      const consecutiveDays = countConsecutiveDays(sessionDates);
    

    return (
       <Container>
        <Row>
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
        </Row>
       </Container>
    )
}

export default Summary