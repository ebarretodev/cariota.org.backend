//Start environment variables
require('dotenv').config();

const { ClientBuilder } = require('@iota/client')
import { OutputMetadata, MessageWrapper } from '@iota/client/lib/types'

// client for messages will connect to Devnet and Local PoW.
const client = new ClientBuilder()
        .node(process.env.IOTA_URL_NETWORK)
        .localPow(true)
        .build()


/**************************************************************
                Account controller creation
***************************************************************** */
export type Account = {
    mnemonic: string,
    seed: string,
    address: string,
}

export const createAccount = async(): Promise<Account> => {
    const mnemonic = client.generateMnemonic();
    const seed = client.mnemonicToHexSeed(mnemonic);
    const newAddressInput = await client.getAddresses(seed)
    .accountIndex(0)
    .range(0, 1)
    .get();
    const address = newAddressInput[0]

    const data: Account = {
        mnemonic,
        seed,
        address,
    }
    return data
}

/**************************************************************
                Controlls to send and receive value and message
***************************************************************** */
//index standard must be: "CARIOTA MESSAGE: ${user}"
//messageData standar must be a json parse {"from": {user}, "to": {npc}, Value: {Number}, "Message":{mesage description}}
export const sendMessage = async (seed: string, address: string, index: string, dataMessage: string ) => {
    const message = await client.message()
        .seed(seed)
        .index(index)
        .data(dataMessage)
        .submit();

    return message.messageId
}

export const sendValue = async (seed: string, address: string, value: number, index: string, dataMessage: string) => {
    const message = await client.message()
        .seed(seed)
        .dustAllowanceOutput(address, value)
        .index(index)
        .data(dataMessage)
        .submit();
    return message.messageId
}



/**************************************************************
                Controlls to send and receive value and message
***************************************************************** */
export const getBalance = async (address: string) => {
    const balance = await client.getAddressBalance(address)
    return balance
}


export const outputsDetailed = async (address: string) => {
    const outputs = await client.findOutputs([], [address])
    const testAddress = await client.bech32ToHex(address)
    let detailedList = []

    for(let i in outputs){
        if(outputs[i].outputIndex == 1){
            const data = await requestData(outputs[i], 'receive')
            detailedList.push(data)
        }else{
            let testTransactionId = outputs[i].transactionId
            while(true){
                const transaction = await client.getIncludedMessage(testTransactionId)
                if(transaction.message.payload.essence.outputs[0].address.address === testAddress){
                    const data = await requestData(transaction, 'send')
                    detailedList.push(data)
                    testTransactionId =  transaction.message.payload.essence.inputs[0].transactionId
                } else if ( transaction.message.payload.essence.outputs[1].address.address === testAddress ){
                    const data = await requestData(transaction, 'receive')
                    detailedList.push(data)
                    break
                }
            }
        }
    }
    return detailedList.sort((a,b) => b.timestamp - a.timestamp)
}

const requestData = async (transaction: MessageWrapper | OutputMetadata , type: string) => {
    const messageMetadata = await client.getMessage().metadata(transaction.messageId)
    const milestone = await client.getMilestone(messageMetadata.referencedByMilestoneIndex)
    const timestamp = milestone.timestamp

    const amount = transaction.amount ? transaction.amount : transaction.message.payload.essence.outputs[1].amount
    const description= `${type.toUpperCase()}: ${amount/1000000}Mi`
    return {timestamp, description, type, amount}
}


//on Construction
export const getMessage = async (index: string) => {
    const message_ids = await client.getMessage().index(index)
    for (let message_id of message_ids) {
        const message_wrapper = await client.getMessage().data(message_id)
        console.log(Buffer.from(message_wrapper.message.payload.data, 'hex').toString('utf8'));
    }
}


