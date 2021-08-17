const net = require('net');
const crypto = require('crypto');
const server = net.createServer((c) => {
    c.once('data',data => {
        const httpContext = data.toString("utf-8");
        let httplines =  httpContext.split('\r\n');
        httplines.shift();
        httplines = httplines.filter(s => s).map(
            s => {
                const i = s.indexOf(":");
                return [s.substr(0,i).trim(),s.substr(i + 1).trim()]
            }
        );
        const headers = Object.fromEntries(httplines);
        const hash = crypto.createHash('sha1');
        hash.update(headers['Sec-WebSocket-Key'] + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
        const key = hash.digest('base64');
        c.write(`HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: ${key}

`)
    })
    c.on('data',data => {
        console.log(data.toString('utf-8'))
    })
})

server.listen(10086,function(){
    console.log('server on 10086')
})