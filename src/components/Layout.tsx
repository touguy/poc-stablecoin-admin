import {
  Box,
  Container
} from '@mui/material';
import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

type Props = {
  children: ReactNode;
  isLayout: boolean;
};

const Layout = ({ children, isLayout }: Props) => {
  return (
    <Box data-page>
      {isLayout && <Header />}
      <Container data-container>
        {isLayout && <Sidebar />}
        <Box component="main">
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default Layout;
