// compile code will go here
const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol'); //dessa forma deixa mais inter
///interoperacional

const source = fs.readFileSync(inboxPath, 'utf8'); //le o conteudo do arquivo no endereço inboxPath

module.exports = solc.compile(source, 1).contracts[':Inbox']; //chama a const solc e compila o conteudo da const source
//exporta as funcoes