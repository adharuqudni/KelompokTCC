import { createServer, IncomingMessage, ServerResponse, Server } from 'http';
import * as url from 'url';
import { stdout } from 'process';
import {
  addSvc,
  cancelSvc,
  doneSvc,
  listSvc,
  getAttachmentSvc,
} from './task.service';
const { config } = require('../config');
let server: Server;

export function run(callback: () => void) {
  server = createServer((req: IncomingMessage, res: ServerResponse) => {
    // cors
    const aborted = cors(req, res);
    if (aborted) {
      return;
    }

    function respond(statusCode: number, message: string) {
      res.statusCode = statusCode || 200;
      res.write(message || '');
      res.end();
    }

    try {
      const uri: url.UrlWithParsedQuery = url.parse(req.url!, true);
      switch (uri.pathname) {
        case '/add':
          if (req.method === 'POST') {
            return addSvc(req, res);
          } else {
            respond(404, 'tidak ditemukan');
          }
          break;
        case '/list':
          if (req.method === 'GET') {
            return listSvc(req, res);
          } else {
            respond(404, 'tidak ditemukan');
          }
          break;
        case '/done':
          if (req.method === 'PUT') {
            return doneSvc(req, res);
          } else {
            respond(404, 'tidak ditemukan');
          }
          break;
        case '/cancel':
          if (req.method === 'PUT') {
            return cancelSvc(req, res);
          } else {
            respond(404, 'tidak ditemukan');
          }
          break;
        default:
          if (/^\/attachment\/\w+/.test(uri.pathname!)) {
            return getAttachmentSvc(req, res);
          }
          respond(404, 'tidak ditemukan');
      }
    } catch (err) {
      respond(500, 'unkown server error');
    }
  });

  // stop handler
  server.on('close', () => {
    if (callback) {
      callback();
    }
  });

  // run server
  const PORT = config.server.port.task;
  server.listen(PORT, () => {
    stdout.write(`🚀 task service listening on port ${PORT}\n`);
  });
}

export function cors(
  req: IncomingMessage,
  res: ServerResponse
): boolean | undefined {
  // handle preflight request
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return true;
  }
}

export function stop() {
  if (server) {
    server.close();
  }
}
