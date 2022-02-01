// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { bytecode, interface } = require("../compile");

let accounts;
let inbox;

beforeEach(async () => {
    //get a list of accounts
    accounts = await web3.eth.getAccounts();

    
    //use one of those accounts to deploy
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy( { data: bytecode, arguments: ['Hello'], })
        .send( { from: accounts[0], gas: '1000000' });
    });

describe('Inbox', () => {
    it('deploy a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods
                                .message()
                                .call();
        assert.equal(message,'my first hello!');
    });

    it('has get the message', async () => {
        await inbox.methods
            .setMessage('Oi novamente')
            .send({ from: accounts[0], gas: "1000000"}); 
        
        const message = await inbox.methods
                                .getMessage()
                                .call()
        assert.equal(message, 'Oi novamente');
    });

    it('has update the message', async () => {
        await inbox.methods
            .setMessage('Olá')
            .send({ from: accounts[0], gas: "1000000"});
        const message = await inbox.methods
                                    .message().call();
        assert.equal(message, 'Olá');
    });
})