"use strict";
const getJSONString = (obj) => {
  return JSON.stringify(obj, null, 2); // （String->Object(JSON)へのparse（エンコード）, Object->Stringデコード）
  // 引数2:replacerコールバック関数, 引数3:インデント数
};

const routeResponseMap = {
  "/info": "<h1>Info Page</h1>",
  "/contact": "<h1>Contact Us</h1>",
  "/about": "<h1>Learn More About Us.</h1>",
  "/hello": "<h1>Say hello by emailing us here</h1>",
  "/error": "<h1>Sorry the page you are looking for is not here.</h1>",
};

const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  //   app = http.createServer();
  fs = require("fs");

// const routeMap = {
//   "/": "views/index.html",
// };
const getViewUrl = (url) => {
  return `views${url}index.html`;
};

http
  .createServer((req, res) => {
    let viewUrl = getViewUrl(req.url);
    fs.readFile(viewUrl, (error, data) => {
      if (error) {
        res.writeHead(httpStatus.NOT_FOUND);
        res.write("<h1>FILE NOT FOUND</h1>");
      } else {
        res.writeHead(httpStatus.OK, {
          "Content-Type": "text/html",
        });
        res.write(data);
      }
      res.end();
    });

    // res.writeHead(httpStatus.OK, {
    //   "Content-Type": "text/html",
    // });

    // if (routeMap[req.url]) {
    //   fs.readFile(routeMap[req.url], (error, data) => {
    //     res.write(data);
    //     res.end();
    //   });
    // } else {
    //   res.end("<h1>Sorry, not found.</h1>");
    // }
  })
  .listen(port);

// app.on("request", (req, res) => {
//   var body = [];

//   req.on("data", (bodyData) => {
//     // 受信したBodyのPOSTデータを配列に入れる。
//     body.push(bodyData);
//   });

//   req.on("end", () => {
//     // データ転送完了時
//     body = Buffer.concat(body).toString(); // 複数のチャンクバッファデータを結合する。
//     console.log(`Request Body Contents: ${body}`);
//   });

//   console.log(`Method: ${getJSONString(req.method)}`);
//   console.log(`URL: ${getJSONString(req.url)}`);
//   console.log(`Headers:${getJSONString(req.headers)}`);

//   // レスポンス準備
//   res.writeHead(httpStatus.OK, {
//     "Content-Type": "text/html",
//   });

//   //   let responseMessage = "<h1>This will show on the screen.</h1>";
//   //   res.end(responseMessage); // Htmlでレスポンスする。
//   if (routeResponseMap[req.url]) {
//     setTimeout(() => res.end(routeResponseMap[req.url]), 2000);
//   } else {
//     res.end("<h1>Welcome!</h1>");
//   }
// });

// app.listen(port);
console.log(`The server has started and is listening on port number : ${port}`);
