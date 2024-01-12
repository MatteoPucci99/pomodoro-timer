import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { startOfDay, endOfDay, isSameDay,format } from 'date-fns';
import { it } from 'date-fns/locale';
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteSessionAction } from "../../redux/actions";
import { useState } from "react";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";



const Detail = ()=>{

    const dispatch = useDispatch()
    const [show,setShow] = useState(false)
    const [selectedSession, setSelectedSession] = useState()
    const [indexPage, setIndexPage] = useState(1)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState(5)
    const sessions = useSelector(state=>state.sessions.content)
    //DAY SESSION 
        // Raggruppa le sessioni per giorni con la somma dei secondi
        const sessionsByDay = sessions.reduce((result, session) => {
        // Ottieni la data della sessione come oggetto Date
        const sessionDate = new Date(session.date);
    
        // Cerca il giorno corrispondente nel risultato
        const day = result.find((d) => isSameDay(sessionDate, d.startDate));
    
        if (day) {
        // Se il giorno esiste, aggiungi la sessione
        day.sessions.push(session);
        // Aggiorna la somma dei secondi
        day.totalSeconds += session.seconds;
        } else {
        // Se il giorno non esiste, crea un nuovo giorno
        result.push({
            startDate: startOfDay(sessionDate),
            endDate: endOfDay(sessionDate),
            sessions: [session],
            totalSeconds: session.seconds,
            _id: session._id
        });
        }
  
    return result;
  }, []);


    const endIndex = Math.min(currentIndex + selectedIndex, sessionsByDay.length);

    const handleNext = ()=>{
        
        const nextIndex = currentIndex + selectedIndex;
        setCurrentIndex(nextIndex < sessionsByDay.length ? nextIndex : currentIndex)
        if(endIndex<sessionsByDay.length){

            setIndexPage(indexPage+1)
        }
    }
    const handlePrev = ()=>{
        const prevIndex = currentIndex - selectedIndex;
        setCurrentIndex(prevIndex >= 0 ? prevIndex : currentIndex)
        if(indexPage > 1){
            setIndexPage(indexPage-1)
        }
    }

  const handleShowModal = (session)=>{setShow(true);setSelectedSession(session)}
  const handleCloseModal = ()=> setShow(false)
  const handleDelete = ()=>{
    dispatch(deleteSessionAction(selectedSession))
    setShow(false)
  }

  

  

    return (
        <Container>
            <Row className="row-cols-1">
                <Col>
                <span className="fw-bold fs-5">Focus Time Detail</span>
                </Col>
                <Col className="mt-4">
                    <Row className="borderCol pb-1"> 
                        <Col className="col-8 text-secondary fw-bold">DATE</Col>
                        <Col className="fw-bold text-secondary">MINUTES</Col>                      
                    </Row>
                    {sessionsByDay.slice(currentIndex, currentIndex + selectedIndex).map((el,index)=>{
                        return (
                            <Row className="borderCol mt-2 py-2" key={index}>
                                <Col className="col-8 text-secondary fw-bold">{format(el.startDate, 'd-MMM', { locale: it })}</Col>
                                <Col className="fw-bold text-secondary d-flex justify-content-between">
                                    <div className="text-end" style={{width:'50%'}}>
                                        {(el.totalSeconds/60).toFixed(0)}
                                    </div>
                                    <div style={{cursor:'pointer'}} onClick={()=>{handleShowModal(el)}}>
                                        <RiDeleteBinLine />
                                    </div>
                                </Col>                      
                            </Row>
                        )
                    })}
                    <Row className="mt-4">
                        <Col className="text-center">
                            {indexPage > 1 && (<GrPrevious onClick={handlePrev} style={{cursor:'pointer'}} />)}
                        </Col>
                        <Col className="text-center">
                            {indexPage}                        
                        </Col>
                        <Col className="text-center">
                            {endIndex < sessionsByDay.length && (<GrNext onClick={handleNext} style={{cursor:'pointer'}}/>)}    
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Modal show={show} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Sei sicuro di voler eliminare la sessione ?</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-end">
                <Button variant="outline-danger" onClick={handleDelete}>
                    Conferma
                </Button>
                </Modal.Body>
              
            </Modal>
        </Container>
    )
}

export default Detail