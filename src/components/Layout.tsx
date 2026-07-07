// 이 컴포넌트는 애플리케이션의 전체 레이아웃을 구성합니다. 헤더와 사이드바를 포함하여 콘텐츠 영역을 감싸는 역할을 합니다.
import {
    Box,
    Container
} from '@mui/material';
import { ReactNode } from 'react';
import Header from './common/Header';
import Sidebar from './common/Sidebar';

type Props = {
  children: ReactNode;
  isLayout: boolean; // 레이아웃을 사용할지 여부를 결정하는 플래그
};

const Layout = ({ children, isLayout }: Props) => {
  return (
    <Box data-page>
      {/* isLayout이 true일 때만 헤더 렌더링 */}
      {isLayout && <Header />}
      <Container data-container>
        {/* isLayout이 true일 때만 사이드바 렌더링 */}
        {isLayout && <Sidebar />}
        <Box component="main">
          {children} {/* 실제 페이지 콘텐츠 렌더링 */}
        </Box>
      </Container>
    </Box>
  );
};

export default Layout;
