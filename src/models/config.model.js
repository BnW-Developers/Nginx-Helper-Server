import { Stream } from '../utils/nginx/stream.util.js';

export class configModel {
  constructor() {
    this.stream = new Stream();
  }
  getConfig() {
    return this.stream.loadConfig();
  }

  setConfig(ip, port) {
    return this.stream.addServerList(ip, port);
  }

  setBanConfig(ip, comment) {
    return this.stream.addBanList(ip, comment);
  }

  deleteConfig(port) {
    return this.stream.deleteServerList(port);
  }
}
