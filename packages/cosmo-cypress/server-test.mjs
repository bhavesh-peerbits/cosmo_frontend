import staticServer from 'node-static';
import http from 'node:http';
import https from 'node:https';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';


const __dirname = path.resolve(dirname(fileURLToPath(import.meta.url)),"../../","app/dist");
const file = new(staticServer.Server)(__dirname);

http.createServer(function (req, res) {
  if (req.url.startsWith('/api') || req.url.startsWith('/realms')) {
    const options = {
      host: '172.17.0.46',
      port: 3000,
      path: req.url,
      method: req.method,
      headers: req.headers,
      rejectUnauthorized: false,
      requestCert: true,
      agent: false
    };

    const proxy = https.request(options, function (proxyRes) {
      res.writeHead(proxyRes.statusCode, proxyRes.headers)
      proxyRes.pipe(res, {
        end: true
      });
    });
    req.pipe(proxy, {
      end: true
    });

  }else {
    if(fs.existsSync(__dirname + req.url)){
      file.serve(req, res);
    } else {
      fs.readFile(__dirname + '/index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
      });
    }
  }
}).listen(4173);
