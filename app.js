const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const www= "127.0.0.1";



const ipCount = {};
app.use((req, res, next) => {
    const hoip = req.ip;
    if (!ipCount[hoip]) {
        ipCount[hoip] = 0;
    }
    ipCount[hoip] += 1;

    if (ipCount[hoip] > 44) {
        res.status(403).send(`You have been refused service. kongqi_air@qq.com`);
        console.log(`${hoip} 被拒绝访问`)
    } else {
        next();
    }
});



app.get('/home', (req, res) => {
    res.redirect('/index.html');
    const hoip = req.ip;
    console.log(`${hoip} 访问了HOME`);
});

app.get('/about', (req, res) => {
    res.redirect('/about.html');
    const hoip = req.ip;
    console.log(`${hoip} 访问了about`);
});

app.get('/404', (req, res) => {
    res.status(404).send(`The server could not find the requested web page. kongqi_air@qq.com`)
    const hoip = req.ip;
    console.log(`${hoip} 访问了404`)
});

app.get('/git', (req, res) => {
    res.redirect('https://github.com');
    const hoip = req.ip;
    console.log(`${hoip} 访问了github`)
});

app.get('/', (req, res) => {
    res.redirect('/about.html');
    const hoip = req.ip;
    console.log(`${hoip} 访问了域名`);
});



app.use(express.static(path.join(__dirname, 'project')));
app.listen(port, () => {
    console.log(`[√] 你の服务器运行在 ${www}:${port}/`);
    console.log(` `)
});
