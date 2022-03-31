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
                //@ts-ignore
                address: req.user.address
            })
            //@ts-ignore
            .then(data => {
                res.status(200).json({message:"Iota sended to address"})
            })
            //@ts-ignore
            .catch(error => {
                console.log(error)
                console.log(error.response.data.error)
                if(error.response.data.error){
                    res.status(error.response.data.error.code).json({error: (error.response.data.error.message)})
                }
                res.status(error.response.status).json({error: (error.response.statusText)})
            })
    },
    balance: async (req: Request, res:Response)=> {
        //@ts-ignore
        const balance = await getBalance(req.user.address)
        res.status(200).json({
            balance: balance.balance
         })
    },
    detailedBalance: async (req: Request, res:Response)=> {
        //@ts-ignore
        const outputs = await outputsDetailed(req.user.address)
        res.status(200).json(outputs)
    },
    sendValue: async (req: Request, res:Response)=> {
        console.log(req.body)
        if(!req.body || !req.body.address || !req.body.amount || !req.body.message){
           return res.status(400).json({error: 'Check values'})
        }
        if(typeof(req.body.amount) == 'string') {
            req.body.amount = parseInt(req.body.amount)
        }
        const result = await sendValue(
            //@ts-ignore
            req.user.seed,
            req.body.address,
            req.body.amount,
            //@ts-ignore
            `CARIOTA: ${req.user.username} send`,
            req.body.message
            )
        res.status(200).json(result)
    },
    outputs: async (req: Request, res:Response)=> {
        //@ts-ignore
        const result = await outputs(req.user.address)
        res.status(200).json(result)
    },
    sendMessage : async (req: Request, res: Response)=>{

        res.status(200).json('ok')
    }
}