import { Stream } from '../utils/nginx/stream.util.js';

export class configModel {
  constructor() {
    this.stream = new Stream('/usr/local/nginx/conf/nginx.conf');
  }
  getConfig() {
    return this.stream.loadConfig();
  }

  setConfig(ip, port) {
    return this.stream.addServerList(ip, port);
  }

  deleteConfig(port) {
    return this.stream.deleteServerList(port);
  }
}
