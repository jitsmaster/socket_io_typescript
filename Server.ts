/// <reference path="typings/tsd.d.ts" />
"use strict";

import * as express from "express";
import * as http from 'http';
import { Route } from './Route';

export class Server {

  public app: express.Application;
  public httpServer: http.Server;
  public io;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express();
    this.httpServer = http['Server'](this.app);
    this.io = require('socket.io')(this.httpServer);
  }

  start(routes: Route[], port: number) {
    routes.forEach(r => {
      this.app.get(r.route, (req, resp) => {
        r.handler(req, resp);
      });
    });
    // this.app.get('/', (req, resp) => {
    //   resp.send("<h1>Socket Starts here</h1>");
    // });
    this.httpServer.listen(port, () => {
      console.log("Socket.io server listening to: " + port);
    })
  }
}





