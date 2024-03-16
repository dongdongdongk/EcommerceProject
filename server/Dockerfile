# 어떤 노드 버전을 사용할것인지 alpine 은 최소 단위의 리눅스 버전을 뜻함ctrl 을 누르고 클릭하면 모든 사용가능한 버전을 확인 가능하다
FROM node:21-alpine 
# 도커 이미지 , 컨테이너 안에서 어떤 경로에 우리가 이걸 실행할지 명시 해 줘야한다 root 경로의 app이라는 폴더안에 소스들을 복사해 오겠다는 뜻
WORKDIR /app

# 프로젝트 파일들을 복사해 와야한다, 빈번히 변경되는 파일 일수록 제일 마지막에 작성해 주는것이 좋다 (레이어 때문) 보통 index 같은게 변경이 많다 디펜던시는 변경이 적으니까 먼저 적어주겠다 
# COPY package.json package-lock.json ./

# 모든 파일을 복사하기
COPY . .

# 이제 이렇게 실행하게 되면 package.json 에 설치되어 있는 npm 을 모두 설치하게 될텐데 install 은 최신 버전을 설치해서 문제가 생길 수 있기 때문에 ci 로 하면 내가 설치한 버전이 설치되니 그렇게 해주자 
RUN npm ci

# 실행 파일을 복사해오고 이제 실행하면 된다 
# COPY server.js .

# 5000번 포트를 열어주겠다 
EXPOSE 5000

# node 라는걸 실행할거고 , index.js 를 실행하라 
ENTRYPOINT [ "node", "server.js" ]