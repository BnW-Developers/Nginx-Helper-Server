import { configModel } from '../models/config.model.js';

class ConfigService {
  constructor() {
    this.configModel = new configModel();
  }

  // 모니터링용 서비스
  getConfig() {
    return this.configModel.getConfig();
  }

  // 게임서버 헬스체크용 서비스
  setConfig(ip, port) {
    // TODO: 아이피, 포트 검증 추가
    return this.configModel.setConfig(ip, port);
  }

  // 아이피 밴 conf 추가
  setBanConfig(ip, comment) {
    // TODO: 아이피, 포트 검증 추가
    return this.configModel.setBanConfig(ip, comment);
  }

  deleteConfig(port) {
    // TODO: 저장된 포트인지 검증 추가
    return this.configModel.deleteConfig(port);
  }
}

export default ConfigService;
