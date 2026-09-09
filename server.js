const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const siteFile = path.join(__dirname, 'straight-talk-real-estate.html');
const dataFile = path.join(process.env.DATA_DIR || __dirname, 'site-data.json');
const adminPassword = process.env.ADMIN_PASSWORD || 'janjua1122';
function json(res, code, data){res.writeHead(code,{'Content-Type':'application/json'});res.end(JSON.stringify(data))}
function readData(){try{return JSON.parse(fs.readFileSync(dataFile,'utf8'))}catch{return null}}
function body(req){return new Promise((ok,no)=>{let b='';req.on('data',x=>{b+=x;if(b.length>12*1024*1024){no(new Error('Payload too large'));req.destroy()}});req.on('end',()=>{try{ok(JSON.parse(b||'{}'))}catch{no(new Error('Invalid data'))}});req.on('error',no)})}

const server = http.createServer((req, res) => {
  if(req.url==='/api/data'&&req.method==='GET')return json(res,200,readData()||{});
  if(req.url==='/api/data'&&req.method==='POST')return body(req).then(x=>{if(x.password!==adminPassword)return json(res,401,{error:'Unauthorized'});fs.mkdirSync(path.dirname(dataFile),{recursive:true});fs.writeFileSync(dataFile,JSON.stringify(x.data));json(res,200,{ok:true})}).catch(error=>json(res,500,{error:error.message||'Save failed'}));
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok' }));
  }

  fs.readFile(siteFile, (error, page) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('Website file could not be loaded.');
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(page);
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Straight Talk Real Estate is running on port ${port}`);
});
