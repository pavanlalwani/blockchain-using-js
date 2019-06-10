const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(timestamp, transaction, previousHash = ''){
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){ 
        return SHA256( this.previousHash + this.timestamp + JSON.stringify(this.transaction) + this.nonce).toString();
    }

    mineBlock(difficulty){
        let timeStart = (Date.now() / 1000)
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
        console.log("Time taken: " +  ( (Date.now() / 1000) - timeStart ).toFixed(2) + " seconds\n");
    }    
}

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block("9/6/2019", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    /*addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }*/

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        this.chain.push(block);

        this.pendingTransactions = [new Transaction(null, miningRewardAddress, this.miningReward)];
    }

    isChainValid(){
        for(let i=1 ; i < this.chain.length ; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(previousBlock.hash !== currentBlock.previousHash){
                return false;
            }
            return true;
        }
    }

    getBalanceOfAddress(address){
        let balance = 0;
        for(const block of this.chain){
            for(const trans of this.block.transaction){

                if(trans.fromAddress == address){
                    balance-=trans.amount;
                }

                if(trans.toAddress == address){
                    balance+=trans.amount;
                }
            }
        }
        return balance;
    }
}



let CryptoCoin = new Blockchain();
CryptoCoin.createTransaction(new Transaction('wallet1','wallet2',20));
CryptoCoin.createTransaction(new Transaction('wallet2','wallet1',300));

CryptoCoin.minePendingTransactions('wallet3');
CryptoCoin.createTransaction(new Transaction('wallet3','wallet2',200));
CryptoCoin.minePendingTransactions('wallet3');

console.log(JSON.stringify(CryptoCoin.chain,null,4));
console.log('Is chain valid? ' + CryptoCoin.isChainValid());
