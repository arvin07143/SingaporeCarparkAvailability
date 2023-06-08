import Parking from "../Parking/Parking"

const parkings = (props) => {
    let parkingData = []
    Object.keys(props.data).forEach(key=>{
        parkingData.push(
        <Parking size={key} 
        max = {props.data[key]["max"]}
        maxlots = {props.data[key]["max_lots"]}
        min = {props.data[key]["min"]}
        minlots = {props.data[key]["min_lots"]}/>)
    })

    return(
        <div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
            {parkingData}
        </div>
    )
}

export default parkings