import { exec } from 'child_process';
import fs from 'fs';

export class Stream {
  constructor(path) {
    this.path = path;
  }

  loadConfig() {
    return fs.readFileSync(this.path, 'utf-8') || null;
  }

  writeConfig(config) {
    fs.writeFileSync(this.path, config);
    exec('sudo /usr/local/nginx/sbin/nginx -s reload', (err) => {
      // 리로드
      if (err) {
        console.error(err);
      } else {
        console.log('Nginx reloaded');
      }
    });
  }

  configToJson(config) {
    const lines = config.split('\n');
    const temp = [];
    let currentObj = { _typeName: 'root', _children: [] };
    const root = currentObj;

    lines.forEach((line) => {
      // 양 끝 공백 삭제
      line = line.trim();
      // 주석이나 빈 줄 건너뛰기
      if (line.startsWith('#') || line === '') return;

      // 블럭 시작일 경우
      if (line.endsWith('{')) {
        const blockName = line.slice(0, -1).trim();
        const newBlock = { _typeName: blockName, _children: [] };
        // 참조관계 형성
        currentObj._children.push(newBlock);
        // 임시 고려장
        temp.push(currentObj);
        currentObj = newBlock;
      } else if (line === '}') {
        // 블럭 종료일 경우 다시 원복
        currentObj = temp.pop();
      } else {
        // 일반 라인일경우 ex: worker_processes auto;
        const [key, ...value] = line.split(' ').filter((e) => e !== '');
        currentObj[key] = value.join(' ').replace(';', '');
      }
    });

    return root;
  }

  jsonToConfig(json, depth = 0) {
    const jump = ' '.repeat(depth);
    let result = '';

    // 루트 블럭이 아니면, 타입명 및 열린 괄호를 적고 개행 ex ) stream {
    if (json._typeName !== 'root') result += `${jump}${json._typeName} {\n`;

    // json 한바퀴 돈다.
    for (const [key, value] of Object.entries(json)) {
      if (key === '_typeName' || key === '_children') continue;
      if (json._typeName === 'root') {
        result += `    ${key} ${value};\n`;
      } else {
        result += `${jump}  ${key} ${value};\n`;
      }
    }

    // 만약 children 객체가 있다면, ex) stream 안에 server
    if (json._children) {
      // 각각의 children
      json._children.forEach((children) => {
        result += this.jsonToConfig(children, depth + 4);
      });
    }
    // 블럭 마무리
    if (json._typeName !== 'root') result += `${jump}}\n`;

    return result;
  }

  addServerList(ip, port) {
    const serverData = {
      _typeName: 'server',
      _children: [],
      listen: port,
      proxy_pass: `${ip}:3000`,
      proxy_timeout: '60s',
      proxy_connect_timeout: '10s',
    };

    let conf = this.loadConfig();
    if (!conf) throw new Error('conf 파일을 로드하는데에 실패하였습니다.');

    const json = this.configToJson(conf);
    if (!json || typeof json !== 'object' || json._typeName !== 'root')
      throw new Error('config 파일을 json으로 변환하는데에 실패하였습니다.');
    // find로 stream 블럭을 불러옴
    const stream = json._children.find((child) => child._typeName === 'stream');
    // 이미 지정한 포트인지 검사
    const verify = stream._children.find((child) => child.listen === port.toString());
    if (verify) throw new Error('이미 지정된 포트입니다.');
    // 서버 리스트 추가
    stream._children.push(serverData);
    // conf 최신화
    conf = this.jsonToConfig(json);
    // 쓰기
    this.writeConfig(conf);
    return serverData;
  }

  deleteServerList(port) {
    let conf = this.loadConfig();
    if (!conf) throw new Error('conf 파일을 로드하는데에 실패하였습니다.');

    const json = this.configToJson(conf);
    if (!json || typeof json !== 'object' || json._typeName !== 'root')
      throw new Error('config 파일을 json으로 변환하는데에 실패하였습니다.');

    // find로 stream 블럭을 불러옴
    const stream = json._children.find((child) => child._typeName === 'stream');

    const serverIdx = stream._children.findIndex((child) => child.listen === port.toString());
    if (serverIdx === -1) throw new Error('삭제하려는 포트가 없습니다.');

    // 관련된 포트 서버 삭제 진행
    const deletedServer = stream._children.splice(serverIdx, 1)[0];
    // conf 최신화
    conf = this.jsonToConfig(json);
    // 쓰기
    this.writeConfig(conf);
    // 삭제요청한 포트 정보 반환
    return deletedServer;
  }
}
