const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('1df7046cdb5d5b58a1ead149ba3a5c35884898583857d9236d926d12cee25b5f');
const myWalletAddress = myKey.getPublic('hex');

let CryptoCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key of recipient', 10);
tx1.signTransaction(myKey);
CryptoCoin.addTransaction(tx1);

CryptoCoin.minePendingTransactions(myWalletAddress);

CryptoCoin.minePendingTransactions(myWalletAddress);

console.log(JSON.stringify(CryptoCoin.chain,null,4));
console.log('Is chain valid? ' + CryptoCoin.isChainValid());
