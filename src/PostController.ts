import { Request, Response } from "express";

export class PostController {

    haldePostRequest(req: Request, res: Response) {
        const {
            body,
            params
        } = req;
        console.log(params, body);
        res.sendStatus(200);
    }

}