# 기본 이미지로 node:20.18.0-alpine3.20을 사용하여 base 스테이지 생성
FROM node:20.18.0-alpine3.20 AS base

# deps 스테이지: 의존성 설치를 위한 단계
FROM base AS deps
# libc6-compat 패키지 설치 (알파인 리눅스 호환성을 위해)
RUN apk add --no-cache libc6-compat
# 작업 디렉토리 설정
WORKDIR /app
# package.json과 package-lock.json 파일 복사
COPY package.json package-lock.json ./
# 인터넷 느릴때 미리 복사
#COPY node_modules ./node_modules
# npm 의존성 설치
RUN npm ci
# Next.js 캐시 삭제
RUN rm -rf ./.next/cache

# builder 스테이지: 소스 코드 빌드를 위한 단계 (의존성 설치 캐싱을 위해)
FROM base AS builder
WORKDIR /app
# deps 스테이지에서 설치한 node_modules 복사
COPY --from=deps /app/node_modules ./node_modules
# 현재 디렉토리의 모든 파일 복사
COPY . ./
# Next.js 애플리케이션 빌드
RUN npm run build

# runner 스테이지: 최종 프로덕션 이미지
FROM base AS runner
WORKDIR /app
# 프로덕션 환경 설정
ENV NODE_ENV=production
# 보안을 위한 시스템 그룹과 사용자 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# 빌드된 파일들을 복사
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# 필요시만 추가
# COPY --from=builder /app/package.json ./

# nextjs 사용자로 전환
USER nextjs
# 3000번 포트 노출
EXPOSE 3000
# 포트 환경변수 설정
#ENV PORT=3000
# 백엔드 API URL 환경변수 설정
#ENV NEXT_PUBLIC_SERVER_API_URL=http://action-be:8080

# 서버 실행 명령
CMD ["node", "server.js"]
