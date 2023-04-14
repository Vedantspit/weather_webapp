const express=require("express");
const https=require("https")

const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/index.html")
});
app.post("/",function(req,res)
{
    const query=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=61652e904986d3e9111ad38cfb9a033a&units=metric";
   https.get(url,function(response)
     {
        console.log(response.statusCode);
        response.on("data",function(data)
        {
            const weatherData=JSON.parse(data)
            console.log(weatherData);
            const temp=weatherData.main.temp;
            console.log(temp);
            const description=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon
            console.log(icon);
            const url2="http://openweathermap.org/img/wn/"+icon+"@2x.png";

            res.write("<p>The weather is "+description+"</p>");
            res.write("<h1>The temperature in "+ query+" is  "+temp+" Degree celsisus</h1>");
            res.write("<img src="+url2+">");
            res.send();
        })
     })

    console.log("POST REQUEST RECIEVED");
})

app.listen(3000,function()
{
    console.log("Server started on port 3000");
}
);

    //  https.get(url,function(response)
    //  {
    //     console.log(response.statusCode);
    //     response.on("data",function(data)
    //     {
    //         const weatherData=JSON.parse(data)
    //         console.log(weatherData);
    //         const temp=weatherData.main.feels_like;
    //         console.log(temp);
    //         const description=weatherData.weather[0].description;
    //         const icon=weatherData.weather[0].icon
    //         console.log(icon);
    //         const url2="http://openweathermap.org/img/wn/"+icon+"@2x.png";

    //         res.write("<p>The weather is "+description+"</p>");
    //         res.write("<h1>The temperature in Zocca,Italy feels like "+temp+" Degree celsisus</h1>");
    //         res.write("<img src="+url2+">");
    //         res.send();
    //     })
    //  })
    