# 1단계: 빌드 환경
FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

# package.json / package-lock.json 먼저 복사
COPY . .

# 프로덕션 빌드에 필요한 dependency 설치
RUN npm ci

# RUN npm run build

# 포트 열기 (Nest 기본 3000번)
EXPOSE 3000

# 실행 커맨드
CMD ["npm", "run", "dev"]