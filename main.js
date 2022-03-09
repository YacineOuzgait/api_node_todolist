require("./api/helpers/string.helper");

const express = require("express");
const routers = require('./api/routers');

const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true
  })
);

app.use(express.json());

for(const route in routers){
  app.use(`/${route}`, new routers[route]().router);
}

app.use('*', (req, res)=> res.send(false));

app.use(express.urlencoded({extended:true}));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const baseService = require('./api/services/base.service');
baseService.initialize();

const config = require("./api/configs")("app");
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}.`);
});