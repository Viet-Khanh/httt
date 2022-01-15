const express = require('express');
const fs = require('fs')
const path = require('path');
var bodyParser = require('body-parser')
var cors = require('cors')

var app = express();
const port = 5000;

app.use(cors())
app.use(bodyParser.json())
app.get("/home", (req, res) => {
    fs.readFile(path.resolve(__dirname, 'job.json'), 'utf8', (err, data) => {
        if (err) throw err
        res.json(JSON.parse(data))
    })
})
app.post("/home", (req, res) => {
    const { sights, ...rest } = req.body
    const dataBody = { ...rest }
    fs.readFile(path.resolve(__dirname, 'add.json'), "utf8", (err, data) => {
        if (err) throw err
        const dataAdd = JSON.parse(data)
        if(sights){
            for (let i = 0; i < sights.length; i++) {
                dataAdd.push(sights[i])
            }
        }
        fs.writeFile(path.resolve(__dirname, 'add.json'), JSON.stringify(dataAdd), (err) => {
            if(err) throw err
            console.log("them thanh cong");
        })
        console.log("dataBody", dataBody, sights);
    })
    fs.readFile(path.resolve(__dirname, 'job.json'), 'utf8', (err, data) => {
        if (err) throw err
        const dataConvert = JSON.parse(data)
        const checkConflic = dataConvert.filter(i => {
            return (i.sex == dataBody.sex &&
                i.ielts == dataBody.ielts &&
                i.level == dataBody.level &&
                i.specialized == dataBody.specialized &&
                i.degree == dataBody.degree &&
                i.communicate == dataBody.communicate &&
                i.work_grops == dataBody.work_grops &&
                i.leader == dataBody.leader &&
                i.presentation == dataBody.presentation)
        })
        console.log("checkConflic", checkConflic);
        if (checkConflic.length == 0) {
            dataConvert.push({ id: dataConvert.length + 1, ...dataBody })
            fs.writeFile(path.resolve(__dirname, 'job.json'), JSON.stringify(dataConvert), (err) => {
                if (err) throw err
            })
            res.send("ok")
        }
        else{
            res.send("okkk")
        }
    })
    // res.send("ok")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})