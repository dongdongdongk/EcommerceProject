# Node.js 21 버전을 기반으로 하는 Alpine 리눅스 이미지를 사용합니다.
FROM node:21-alpine

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# 애플리케이션 종속성 설치
COPY package*.json ./
RUN npm install

# 소스 코드를 복사합니다.
COPY . .

# 4000번 포트를 열어주겠다 
EXPOSE 4000

# 소켓 실행
CMD ["node", "index.js"]