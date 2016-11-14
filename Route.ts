/// <reference path="typings/tsd.d.ts" />
import * as express from "express";

export class Route {
	route: string;
	handler: (req: express.Request, resp: express.Response) => void;
}