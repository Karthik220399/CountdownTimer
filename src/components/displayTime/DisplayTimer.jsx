
import Style from "./DisplayTimer.module.css"


const DisplayTimer = ({time, representation})=>{
    return (
        <div className={Style.parentBox}>
            <div className={Style.Time}>
                {time}
            </div>
            <div className={Style.Timeresp}>
               {representation}
            </div>
        </div>
    )
}

export default DisplayTimer