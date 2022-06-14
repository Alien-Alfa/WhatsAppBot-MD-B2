const axios = require('axios')
let handler = async (m, { msgsz, args  , usedPrefix, command })=>{
if(!args[0]) throw " please provide place or location name"

    try{

        const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args[0]}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`)
        const res = await response

        const name = res.data.name
        const Country = res.data.sys.country
        const Weather= res.data.weather[0].description
        const Temperature = res.data.main.temp + '°C'
        const Minimum_Temperature= res.data.main.temp_min + '°C'
        const Maximum_Temperature= res.data.main.temp_max + '°C'
        const Humidity= res.data.main.humidity + '%'
        const Wind= res.data.wind.speed + 'km/h'


        msgsz.reply(m.chat,`
Place: ${name}
Country: ${Country}
Weather: ${Weather}
Temperature: ${Temperature}
Minimum Temperature: ${Minimum_Temperature}
Maximum Temperature: ${Maximum_Temperature}
Humidity: ${Humidity}
Wind: ${Wind}
        `.trim(),m)
    }catch(e){
throw 'location not found' 

    }




}

handler.help1 = ['ᴡᴇᴀᴛʜᴇʀ']
handler.help = ['𝚆𝙴𝙰𝚃𝙷𝙴𝚁']
handler.tags = ['internet']
handler.command = /^(weather|wthr)$/i

module.exports = handler
