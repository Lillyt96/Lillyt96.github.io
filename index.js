//define the port on which the back end is run on
const PORT = 8000

//Save packages
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()
//Listen to changes on the port
app.listen(8000, () => console.log(`Sever is running on port ${PORT}`))

app.get('/schedule', async (req, res) => {

        const scheduleDataResponse = await fetch (
          `https://NA1.api.riotgames.com/lol/clash/v1/tournaments?api_key=${process.env.RIOT_API_KEY}`,
          { 
            accept: {
              "Content-Type": "application/json",
            },
          }
        );    
      
        let scheduleData = (await scheduleDataResponse.json())
        
        let scheduleDataArr = []
        for (let i = 0; i < scheduleData.length; i++) {
      
          let tournament = {nameKey: scheduleData[i].nameKey, nameDate: scheduleData[i].schedule[0].startTime}
          scheduleDataArr.push(tournament)
        }
        scheduleDataArr.sort((a, b) => {
          return a.nameDate - b.nameDate
        });

      
        res.json(scheduleData);
      
      }
      )