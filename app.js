const express = require('express')
const bodyParser = require('body-parser')
const request = require('request');
const https = require('https');

const app = express()
const port = 3000

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => res.sendFile(__dirname + "/signup.html"));

app.post("/",(req,res) =>{
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address : email,
                status:"subscribed",
                merge_fields: {
                    FNAME : firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/0fd33bb79b";

    const options = {
        method: "POST",
        auth : "manu:e560bbff56d402b9b68663bcdc77d173-us14"
    }
    const request = https.request(url,options,response =>{
        response.on("data",data =>{
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

    
})

app.listen(port, () => console.log(`server is running on port ${port}!`))


//list id = 0fd33bb79b
//api key = e560bbff56d402b9b68663bcdc77d173-us14