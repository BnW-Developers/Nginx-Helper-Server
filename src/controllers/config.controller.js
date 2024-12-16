import ConfigService from '../services/config.services.js';

export class ConfigController {
  #configService;
  constructor() {
    this.#configService = new ConfigService();
  }

  getConfig = (_, res, next) => {
    try {
      const configs = this.#configService.getConfig();
      return res.status(200).json({ configs });
    } catch (err) {
      next(err);
    }
  };

  setConfig = (req, res, next) => {
    try {
      const { ip, port } = req.body;
      this.#configService.setConfig(ip, port);
      return res.status(200).json({ message: '정상 등록' });
    } catch (err) {
      next(err);
    }
  };

  setBanConfig = (req, res, next) => {
    try {
      const { ip, comment } = req.body;
      this.#configService.setBanConfig(ip, comment);
      return res.status(200).json({ message: '정상 등록' });
    } catch (err) {
      next(err);
    }
  };

  deleteConfig = (req, res, next) => {
    try {
      const { port } = req.body;
      const deletedServer = this.#configService.deleteConfig(port);
      return res.status(200).json({ data: deletedServer });
    } catch (err) {
      next(err);
    }
  };
}
