import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

type Props = {
  children: ReactNode;
  title: string;
};

const Layout = ({ children, title }: Props) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header/>
      <div className="flex flex-1 min-h-0">
        <Sidebar/>
        <main className="flex-1 overflow-auto bg-gray-50 p-6 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
