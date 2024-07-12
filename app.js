const express = require("express");
const bodyParser = require("body-parser"); // to pass data of form in json format
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // To access the body parser package
app.use(express.static("Public")); // to access static files such as images and css

const apiKey = "d9905a305481989797b80db53f037a14-us14";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});



app.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const url = "https://us14.api.mailchimp.com/3.0/lists/1214885901";
  const data = {
    members: [
      {
        
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const JsonData = JSON.stringify(data);
  const option = {
    method: "POST",
    auth: "Ayushman2694:" + apiKey
  };

  const request = https.request(url, option, (response) => {
    
    response.on("data", (data) => {
      console.log(JSON.parse(data));
    
    });
    if(response.statuCode == 200){
    res.sendFile(__dirname + "/success.html");
    console.log(response.statusCode);}
    else{
    res.sendFile(__dirname +"/failure.html");
    console.log(response.statusCode);}
  });
  request.write(JsonData);
  request.end();
});

app.post("/failure",(req,res)=>{
  res.redirect("/");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("server is listening to port " + process.env.PORT || 5000 );
});
