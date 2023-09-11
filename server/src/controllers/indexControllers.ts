import {Request,Response} from "express";

class IndexController {
  public index(req:Request, res:Response) {
    res.json("Hello");
  }
}

export const indexController = new IndexController();
