import classes from './Parking.module.css'

const parking = (props) =>(
    <div className={classes.Parking}>
        <h4>{props.size}</h4>
        <div>
            <p>Highest ({props.max})</p>
            <p>{props.maxlots.join(',')}</p>
            <p>Lowest ({props.min})</p>
            <p>{props.minlots.join(' , ')}</p>
        </div>
    </div>
)

export default parking