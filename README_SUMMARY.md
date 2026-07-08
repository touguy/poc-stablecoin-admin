# 프로젝트 개요: Stablecoin Admin Portal

## 1. 프로젝트 목적
본 프로젝트는 스테이블코인(Stablecoin) 관련 관리 시스템을 위한 웹 애플리케이션입니다. 대시보드 형태의 인터페이스를 통해 사용자의 권한 관리, 요청 처리, 서비스 상태 모니터링 등 운영에 필요한 핵심 기능들을 제공합니다.

## 2. 기술 스택
- **Framework**: Next.js (App Router 또는 Pages Router 기반 - 현재 `src/pages` 구조 확인)
- **Language**: TypeScript
- **Styling**: SCSS (Sass), CSS Modules
- **State Management**: 전용 Store 시스템 (예: Zustand 혹은 유사한 상태 관리 라이브러리 활용)
- **Infrastructure**: Kubernetes (Deployment, Service, Ingress 설정 포함)

## 3. 프로젝트 구조 및 역할 정의

### 루트 디렉토리 구성
- `src/`: 핵심 소스 코드 폴더
    - `pages/`: Next.js 라우팅 및 페이지 컴포넌트 정의
    - `components/`: 재사용 가능한 UI 요소 및 기능 단위의 컴포넌트 (Auth, Common, Request, Services 등)
    - `hooks/`: 비즈니스 로직과 UI를 분리한 사용자 정의 커스텀 훅
    - `styles/`: 전역 스타일 및 테마 설정
    - `store/`: 애플리케이션의 상태(State) 관리 (로그인 정보, 글로벌 상태 등)
    - `utils/`: 공통 유틸리티 함수 (Fetcher, Formatter, Axios 설정 등)
    - `constants/`: 시스템 설정값, 상수 데이터 정의
    - `types/`: TypeScript 타입 정의 파일
- `public/`: 정적 자원 (이미지, 아이콘, 폰트 등)
- `deploy/`: Kubernetes 배포를 위한 매니페스트 파일들 (`deployment.yml`, `ingress.yml` 등)

## 4. 핵심 기능 및 프로세스 흐름(Flow)

### A. 공통 인프라 (Core Infrastructure)
- **네트워크 통신**: `src/utils/axios.ts`를 통해 전역 Axios 인스턴스를 설정하며, 모든 API 응답은 인터셉터를 통해 정제된 데이터로 처리됩니다.
- **데이터 페칭(Fetching)**: `swr` 라이브러리와 자체 구현한 `fetcher`를 조합하여 클라이언트 사이드 데이터 캐싱 및 상태 관리를 수행합니다.

### B. 핵심 도메인 로직 (Core Domains)
본 프로젝트는 두 가지 주요 트랜잭션 흐름을 관리합니다.

#### 1. 발행(Mint) 프로세스
- **조회**: `RequetsMintService.ts`를 통해 대시보드에 표시될 Mint 요청 목록을 가져오고, 상세 페이지에서 개별 Tx 정보를 조회합니다.
- **관리**: 관리자가 승인 또는 거절 처리를 수행하며, 이 과정이 데이터베이스에 반영됩니다.

#### 2. 환불(Redeem) 프로세스
- **조회**: `RequestsRedemService.ts`를 통해 Redeem 요청 목록을 가져오며, 캐싱 정책(`keepPreviousData`)과 오류 처리 전략이 설정되어 있습니다.
- **관리**: 관리자가 환불 요청에 대해 승인/거절 조치를 취합니다.

### C. 사용자 인터페이스(UI) 흐름
1.  **진입점 및 인증**: 사용자는 메인 페이지를 거쳐 `/login`을 통해 인증을 완료하며, `authStore`를 통해 세션 정보를 유지합니다.
2.  **대시보드/관리**: `src/pages/request/manage.tsx` 진입 시 탭(Mint / Redeem)을 선택하고 검색어 및 페이지네이션 조건에 따라 리스트를 필터링합니다.
3.  **공통 컴포넌트 활용**:
    -   **Layout**: `Header`, `Nav`, `Sidebar`를 통해 일관된 네비게이션 제공.
    -   **Common UI**: `BreadcrumbsBox`, `MuiTabs`, `SearchArea`, `Popup` 등을 사용하여 중복 로직을 최소화하고 가독성을 확보합니다.


## 5. 향후 상세화 계획
- [ ] `src/pages` 내 각 경로별 세부 기능 분석 및 기술
- [ ] `src/components`의 핵심 컴포넌트 로직 분해 및 기록
- [ ] 데이터 모델링(Types) 및 API 통신 구조(Utils) 상세화
- [ ] 배포 파이프라인 및 인프라 설정 내용 요약 추가
