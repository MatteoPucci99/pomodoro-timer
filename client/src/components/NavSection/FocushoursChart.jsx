import { useSelector } from "react-redux"
import { startOfWeek, endOfWeek, format, isSameWeek, startOfDay, endOfDay, isSameDay } from 'date-fns';
import { it } from 'date-fns/locale';
import ReactApexChart from "react-apexcharts"
import { useEffect, useState } from "react";


const FocushoursChart = (props)=>{

    const sessions = useSelector((state) => state.sessions.content);
    const [dati,setDati] = useState()
    const colors = ['#f5a3a2ff']
    

//WEEK SESSIONS
    // Raggruppa le sessioni per settimane con la somma dei secondi
    const sessionsByWeek = sessions.reduce((result, session) => {
      // Ottieni la data della sessione come oggetto Date
      const sessionDate = new Date(session.date);
    
      // Cerca la settimana corrispondente nel risultato
      const week = result.find((week) => isSameWeek(sessionDate, week.startDate));
    
      if (week) {
        // Se la settimana esiste, aggiungi la sessione
        week.sessions.push(session);
        // Aggiorna la somma dei secondi
        week.totalSeconds += session.seconds;
      } else {
        // Se la settimana non esiste, crea una nuova settimana
        result.push({
          startDate: startOfWeek(sessionDate),
          endDate: endOfWeek(sessionDate),
          sessions: [session],
          totalSeconds: session.seconds,
        });
      }
    
      return result;
    }, []);
    
    

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
      });
    }
  
    return result;
  }, []);



  const selectedSessions = props.selected === 'Week' ? sessionsByDay : sessionsByWeek;

  const dataForChart = selectedSessions.map(el => (el.totalSeconds / 3600).toFixed(2))
  const xData = selectedSessions.map(el => format(el.startDate, 'd-MMM', { locale: it }));
  const numToShow = props.selected === 'Week' ? 7 : 4;
  const xDataToShow = xData.slice(-numToShow);
  const dataForChartToShow = dataForChart.slice(-numToShow)
   
    useEffect(()=>{
      setDati({

          
        series: [{
          data: dataForChartToShow
        }],
        options: {
          chart: {
            height: 350,
            type: 'bar',
            events: {
              click: function(chart, w, e) {
               
              }
            }
          },
          colors: colors,
          plotOptions: {
            bar: {
              columnWidth: '45%',
              distributed: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          grid: {
            borderColor: '#93A0AB ', 
            strokeDashArray: 2.5, 
          },
          xaxis: {
            categories: xDataToShow,
            labels: {
              style: {
                colors: colors,
                fontSize: '12px'
              }
            },
            axisBorder: {
              color: 'transparent', 
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: '#879199 ',  
              },
            },
          },

        },
      
      
      })
    },[props.selected,sessions])
  
 
 


    return (
        <div>
             {dati && (  <ReactApexChart options={dati.options} series={dati.series} type="bar" height='300px' /> )}
        </div>
    )
}

export default FocushoursChart