import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { startOfDay, isSameDay,format } from 'date-fns';
import { it } from 'date-fns/locale';
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteSessionAction } from "../../redux/actions";
import { useState } from "react";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";



const Detail = ()=>{

    const dispatch = useDispatch()
    //Stato per gestire il modale
    const [show,setShow] = useState(false)
    const [selectedSession, setSelectedSession] = useState()
    const [indexPage, setIndexPage] = useState(1)
    //Stato di partenza del indice di visualizzazione
    const [currentIndex, setCurrentIndex] = useState(0)
    //Stato per gestire quanti elementi visualizzare per pagina
    const [selectedIndex, setSelectedIndex] = useState(5)

    const sessions = useSelector(state=>state.sessions.content)
    const orderedDates = [...sessions].sort((a, b) => new Date(b.date) - new Date(a.date));

   

    //DAY SESSION 

        //Funzione per creare un array di oggetti, in cui ogni oggetto è una sessione giornaliera
        //Inizializzo result (che è l'accumulatore con un array vuoto)
        const sessionsByDay = orderedDates.reduce((result, session) => {
        // Creo sessionDate e lo uso come "chiave" di ricerca per individuare tutti i giorni uguali
        const sessionDate = new Date(session.date);
        const day = result.find((d) => isSameDay(sessionDate, d.startDate));
    
        if (day) {
        // Se ci esistono giorni uguali vengono "unificati" in un singolo oggetto. Siccome l'array di partenza è vuoto, si va
        // direttamente nel blocco else per "inizializzare" il primo oggetto "day" nell'array result da cui partirà successivamente
        // la ricerca con il find.
        day.sessions.push(session);
        day.totalSeconds += session.seconds;
        } else {
        // Se il giorno non esiste, crea un nuovo oggetto "day" con le seguenti proprietà
        result.push({
            startDate: startOfDay(sessionDate),
            sessions: [session],
            totalSeconds: session.seconds,
            _id: session._id
        });
        }
        return result;
    }, []);



    const endIndex = Math.min(currentIndex + selectedIndex, sessionsByDay.length);

    //Funzioni per gestire la visualizzazione delle pagine, ad ogni click delle icone, il currentIndex cambierà in base a nextIndex o prevIndex
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
  //Funzione per gestire l'apparizione del modale per eliminare una sessione.
  //Viene salvata la sessione nello stato per poterla eliminare quando si da la conferma
  const handleShowModal = (session)=>{setShow(true);setSelectedSession(session)}
  const handleCloseModal = ()=> setShow(false)

  //Funzione per "dispatchare" l'action delete ed eliminare una sessione.
  //Viene passata la sessione salvata nello stato al dispatch.
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