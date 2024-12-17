# Nginx Helper Server
----
![image](https://github.com/user-attachments/assets/348c164f-0310-46de-bcbc-c5c0eef5e150)

## 소개
Nginx Helper Server는 War of Paws 게임의 분산서버를 효율적으로 관리할 수 있는 Nginx 서버의 설정을 관리하고 모니터링하는 서버 애플리케이션입니다. 이 애플리케이션은 Express.js를 기반으로 하며, Nginx 설정 파일을 동적으로 수정하는 기능을 제공합니다.

- 🕹️ [냥멍대전 게임서버](https://github.com/BnW-Developers/War-Of-Paws-Game-Server)  
- 🔑 [냥멍대전 인증서버](https://github.com/BnW-Developers/War-Of-Paws-Auth-Server)  
- 🎯 [로비-매칭서버](https://github.com/BnW-Developers/War-Of-Paws-Lobby-Matching-Server)  
- 💊 [Nginx-헬퍼 서버](https://github.com/BnW-Developers/Nginx-Helper-Server)  
- ✅ [헬스체크 서버](https://github.com/BnW-Developers/War-Of-Paws-Health-Server)  

## 프로젝트 코드 플로우
![image](https://github.com/user-attachments/assets/8575272e-6286-4f77-adfd-d67942400e9e)


## 주요 기능

- **서버 설정 관리**: Nginx 설정 파일(nginx.conf)을 API 통신을 통해 동적으로 수정하여 서버 리스트를 추가하거나 삭제할 수 있습니다. (Stream)
- **IP 차단 관리**: API 통신을 통해 요청받은 특정 IP를 차단 목록에 추가할 수 있습니다.
## 주요 API
모든 API 요청은 auth.middleware.js를 통해 인증됩니다. 요청 헤더에 authorization 키를 포함해야 합니다.

`{ authorization : API_KEY(hash)}`

### 1. 서버 설정관리
**GET /config/serverList**  - 서버 리스트 조회
요청 예시:
```
{}
```
응답 예시:
```
{ configs }
```

**POST /config/serverList** - nginx.conf 내 서버 리스트에 새로운 Stream 서버 포트 매핑
요청 예시:
```
{ ip, port }
```
응답 예시:
```
{ message: '정상 등록' }
```

**DELETE /config/serverList** - nginx.conf 내 서버 리스트에서 요청한 Stream 서버 포트 삭제
요청 예시:
```
{ port } 
```
응답 예시:
```
{ data: deletedServer }
```

---

### 2. IP 차단 
**POST /config/banList** - Ips_ban.conf 요청 아이피 차단리스트 추가
요청 예시:
```
{ ip, comment } // comment는 선택
```
응답 예시:
```
{ message: '정상 등록' }
```
---

### 기술 스택
<img src="https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=flat-square" style="height : 25px; margin-left : 10px; margin-right : 10px;"/>&nbsp;
<img src="https://shields.io/badge/Node.js-339933?logo=Node.js&logoColor=fff&style=flat-square" style="height : 25px; margin-left : 10px; margin-right : 10px;"/>&nbsp;
<img src="https://shields.io/badge/Express-000000?logo=Express&logoColor=fff&style=flat-square" style="height : 25px; margin-left : 10px; margin-right : 10px;"/>&nbsp;

### 인증
<img src="https://shields.io/badge/JWT-000000?logo=JSONWebTokens&logoColor=fff&style=flat-square" style="height : 25px; margin-left : 10px; margin-right : 10px;"/>&nbsp;
<img src="https://shields.io/badge/BCRYPT-3C873A?logo=OAuth&logoColor=fff&style=flat-square" style="height : 25px; margin-left : 10px; margin-right : 10px;"/>&nbsp;

### DevOps
<img src="https://shields.io/badge/Docker-2496ED?logo=Docker&logoColor=fff&style=flat-square" style="height : 25px; margin-left : 10px; margin-right : 10px;"/>&nbsp;

### 배포 환경
<img src="https://shields.io/badge/GCP-4285F4?logo=GoogleCloud&logoColor=fff&style=flat-square" style="height : 25px; margin-left : 10px; margin-right : 10px;"/>&nbsp;

## 프로젝트 구조
```
📦src
 ┣ 📂config
 ┃ ┗ 📜config.js
 ┣ 📂constants
 ┃ ┗ 📜env.js
 ┣ 📂controllers
 ┃ ┗ 📜config.controller.js
 ┣ 📂middlewares
 ┃ ┣ 📜auth.middleware.js
 ┃ ┗ 📜error-handling.middleware.js
 ┣ 📂models
 ┃ ┗ 📜config.model.js
 ┣ 📂pages
 ┃ ┗ 📜test.html
 ┣ 📂routes
 ┃ ┣ 📜config.router.js
 ┃ ┗ 📜index.router.js
 ┣ 📂services
 ┃ ┗ 📜config.services.js
 ┣ 📂utils
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜checkHashed.util.js
 ┃ ┃ ┗ 📜hashed.util.js
 ┃ ┣ 📂error
 ┃ ┃ ┗ 📜CustomErr.js
 ┃ ┣ 📂fommatter
 ┃ ┃ ┗ 📜timeFormatter.js
 ┃ ┣ 📂log
 ┃ ┃ ┗ 📜logger.js
 ┃ ┗ 📂nginx
 ┃ ┃ ┗ 📜stream.util.js
 ┗ 📜server.js
 ```
