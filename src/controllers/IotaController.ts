//Import types
import { Request, Response} from 'express'


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
    },
}