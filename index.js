// Configuration
var Web3 = require('web3');
const EthereumTransaction = require('ethereumjs-tx').Transaction

// Use the RPC Server address provided by Ganache 
var web3 = new Web3('http://127.0.0.1:7545');

// Set Addresses from Ganache
var sendingAddress = 'YOUR FIRST GANACHE TEST ACCOUNT ADDRESS';
var receivingAddress = 'YOUR SECOND GANACHE TEST ACCOUNT ADDRESS';

web3.eth.getBalance(sendingAddress).then(console.log);
web3.eth.getBalance(receivingAddress).then(console.log);

// Create transaction
var rawTransaction = { 
	nonce: '0x01', 
	to: receivingAddress, 
	gasPrice: '0x09184e72a000', 
	gasLimit: '0x6691B7', 
	value: '0x001'
}

// Sign Transaction
var privateKeySender  = new Buffer.from('FIRST GANACHE TEST ACCOUNT PRIVATE KEY', 'hex')
const tx = new EthereumTransaction (rawTransaction, { chain: 'mainnet', hardfork: 'petersburg' })
tx.sign(privateKeySender)
const serializedTransaction = tx.serialize()

// Send Transaction
web3.eth.sendSignedTransaction(serializedTransaction.toString('hex'), function(err, hash) {
  if (!err)
    console.log(hash); 
});