
import Styles from "./Countdown.module.css"
import DisplayTimer from './displayTime/DisplayTimer';
import { useEffect, useState } from "react";

const Countdown = ()=>{

    const [isRunning, setIsRunning] = useState(false)
    const [targetDate, setTargetDate] = useState("")
    const [timeRemaining , setTimeRemaining] = useState(0);
    const [timerId, setTimerId] = useState(null);
    const [timeDone,setTimeDone] = useState(false) 


    useEffect(()=>{
       const getLocal = localStorage.getItem("targetDate");
       setTargetDate(getLocal);
      
    },[])

    useEffect(()=>{

        if(localStorage.getItem("isRunning")){
            logic()
        }
    },[targetDate])

    const toggleCountdown = (e)=>{
        e.preventDefault();
        
        if(isRunning){
            clearInterval(timerId);
            setTimeRemaining(0);
            localStorage.clear();
            setIsRunning(false);
    
        }else{
            logic()
            }
        }
    
const logic = ()=>{
    const targetTime = new Date(targetDate).getTime();
    const currentTime =  new Date().getTime();
    const Timediffernce = targetTime - currentTime
         if(Timediffernce > 0){
            setTimeRemaining(Timediffernce);
            localStorage.clear()
            localStorage.setItem("targetDate", targetDate)
            localStorage.setItem("isRunning", true)
            const id = setInterval(()=>{
                const nowTime =  new Date().getTime();
                const updateTime = targetTime - nowTime;
                if(updateTime>0){
                    clearInterval(timerId)
                    setTimeRemaining(updateTime)
                    setIsRunning(true)
                    localStorage.setItem("isRunning", true)
                    setTimeDone(false)
                }else{
                    clearInterval(timerId);
                    setIsRunning(false);
                    setTimeDone(true)
                }
                
            },1000)

            setTimerId(id)
         }
}
       

    const handleChange = (e)=>{
        if(isRunning){
            alert("Stop the timer before changing the dates")
        }else{
            setTargetDate(e.target.value);
            localStorage.setItem("targetDate", e.target.value)
          
        }
       
    }

    const displayTimeinSec  = (time) => {

        const days = Math.floor(time/(1000*60*60*24));
        const hours = Math.floor((time % (1000*60*60*24))/(1000*60*60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60))/1000);

        // console.log(time, seconds)

        const timeArr = [[days,"Days"],[hours,"Hours"],[minutes,"Minutes"],[seconds,"Seconds"]]

        //  setTimerArr(timeArr) 
        // console.log(timeArr)

        if(days >= 100){
            return <div className={Styles.more}>Selected time is more than 100 days</div>
        }

          return (
            <div className={Styles.maps}>
              
                {timeArr.map((timer)=>
                 <DisplayTimer key={timer[1]} time={timer[0]} representation={timer[1]}/> )}
            </div>
        )
       
    }


    return (
        <div className={Styles.parent}>
          <h2>Countdown <span className={Styles.header}>Timer</span></h2>
 


          <form className={Styles.form} onSubmit={toggleCountdown}>
            <input className={Styles.inputs} type="datetime-local" value={targetDate} onChange={handleChange} />
            <button className={Styles.inputs} type="submit">
                {isRunning?  "Stop Timer" : "Start Timer"}
            </button>
          </form>
 

            <div className={Styles.timeBox}>
            { timeDone? <div className={Styles.more}>The Countdown is over. what's next on your adventure</div>: displayTimeinSec(timeRemaining)}
            </div>
           
        </div>
    )
}

export default Countdown