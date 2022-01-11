//Import types
import { Request, Response} from 'express'
const axios = require('axios')
import { getBalance, outputsDetailed, sendValue } from '../middlewares/iota'


//Create functions for export
module.exports = {
    buy: async (req: Request, res:Response)=> {
        /*method Post
        Endpoint:  https://faucet.chrysalis-devnet.iota.cafe/api/plugins/faucet/enqueue
        Content-Type: application/json
        body: {
            "address":"atoi1..."
        }
        */
        axios
            .post('https://faucet.chrysalis-devnet.iota.cafe/api/plugins/faucet/enqueue', {
                address: req.user.address
            })
            .then(data => {
                res.status(200).json({message:"Iota sended to address"})
            })
            .catch(error => {
                res.status(400).json({error: error})
            })
    },
    balance: async (req: Request, res:Response)=> {
        const balance = await getBalance(req.user.address)
        res.status(200).json({
            balance: balance.balance
         })
    },
    detailedBalance: async (req: Request, res:Response)=> {
        const outputs = await outputsDetailed(req.user.address)
        res.status(200).json(outputs)
    },
    sendValue: async (req: Request, res:Response)=> {
        const result = await sendValue(
            req.user.seed,
            'atoi1qzhnmur875gkjf3zctkhwrwyvr7t3ey9x6yp5546ed3ksxp5xnuhg5k45a8',
            1000000,
            'Qualquer coisa',
            'Qualquer coisa'
            )
        res.status(200).json(result)
    },
    outputs: async (req: Request, res:Response)=> {
        const result = await outputs(req.user.address)
        res.status(200).json(result)
    },
}