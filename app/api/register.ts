
import createUser from '@/services/models/user'
import type { NextApiRequest, NextApiResponse } from 'next'




export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        let doc = await createUser(req.body);

        return res.status(200).json({
            message: "Successfully created.....",
            data: doc,

        })
    } else {
        res.status(400).json({ error: "Get request is not allowed." })
    }
}