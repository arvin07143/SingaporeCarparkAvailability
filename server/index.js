const express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')
const port = 4000

app.use(cors())

app.get('/', (req, res) => {
    axios.get("https://api.data.gov.sg/v1/transport/carpark-availability")
    .then(response =>{
        let carpark_data = response.data["items"][0]["carpark_data"]

        let aggregated_data = {
            "small":[],
            "medium":[],
            "big":[],
            "large":[]
        };


        //sort into size
        carpark_data.forEach(carpark => {
            let carpark_info = carpark["carpark_info"]
            let total_lots = 0
            let available_lots = 0
            carpark_info.forEach(info =>{
                total_lots += parseInt(info["total_lots"])
                available_lots += parseInt(info["lots_available"])
            })

            let newData = {
                "carpark_number":carpark["carpark_number"],
                "total_lots" : total_lots,
                "available_lots" : available_lots
            }

            switch(true){
                case total_lots >= 400:
                    aggregated_data["large"].push(newData);
                    break;
                case total_lots >= 300:
                    aggregated_data["big"].push(newData);
                    break;
                case total_lots >= 100:
                    aggregated_data["medium"].push(newData);
                    break;
                case total_lots >= 0:
                    aggregated_data["small"].push(newData);
                    break;
                default:
                    console.log(total_lots)
            }

        });


        let out = {}

        Object.keys(aggregated_data).forEach(key =>{
            let avail = {}
            aggregated_data[key].forEach(el =>{
                if(el["available_lots"] in avail){
                    avail[el["available_lots"]].push(el["carpark_number"])
                } else{
                    avail[el["available_lots"]] = [el["carpark_number"]]
                }

                const min = Math.min(...Object.keys(avail).map(key=>parseInt(key)))
                const max = Math.max(...Object.keys(avail).map(key=>parseInt(key)))

                out[key] = {
                    "max" : max,
                    "max_lots" : avail[max],
                    "min" : min,
                    "min_lots" : avail[min]
                }
            })
        })

        console.log(out)

        res.send(out)
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})