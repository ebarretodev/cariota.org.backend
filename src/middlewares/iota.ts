//Start environment variables
require('dotenv').config();

const { ClientBuilder } = require('@iota/client')
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
        .output(address, value)
        .index(index)
        .data(dataMessage)
        .submit();
    return message.messageId
}



/**************************************************************
                Controlls to send and receive value and message
***************************************************************** */
export const getBalance = async (seed: string) => {
    const balance = await client.getBalance(seed)
        .get();
    return balance
}


export const getMessage = async (index: string) => {
    const message_ids = await client.getMessage().index(index)
    for (let message_id of message_ids) {
        const message_wrapper = await client.getMessage().data(message_id)
        console.log(Buffer.from(message_wrapper.message.payload.data, 'hex').toString('utf8'));
    }
}


