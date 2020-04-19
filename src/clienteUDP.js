if(process.argv.length <= 2){ // verifica se tem o argumento da porta
    console.error('erro: digite a porta a ser usada');
}else{
    const port = process.argv[process.argv.length-1];
    const dgram = require('dgram');
    const message = Buffer.from('enviando...');
    const client = dgram.createSocket('udp4');
    client.connect(port, 'localhost', (err) => {
        setInterval(() => {
            client.send(message);
        },100);
    });
}
