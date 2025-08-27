import Link from 'next/link';
import { useState } from 'react';

const Sidebar = () => {
  const [isTokenMenuOpen, setTokenMenuOpen] = useState(false);
  const [isContractMenuOpen, setContractMenuOpen] = useState(false);

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-4">
      <nav className="space-y-6">
            {/* 발행/환불 관리 메뉴 */}
            <div>
              <h2
                className={`text-lg font-semibold mb-2 cursor-pointer p-2 rounded flex items-center justify-between ${
                  isTokenMenuOpen ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
                onClick={() => setTokenMenuOpen(!isTokenMenuOpen)}
              >
                <span>발행/환불 관리</span>
                <span>{isTokenMenuOpen ? '-' : '+'}</span>
              </h2>
              {isTokenMenuOpen && (
                <div className="space-y-2 pl-4">
                  <Link href="/request-list" className="block hover:text-gray-300"> - 발행/환불 현황</Link>
                  <Link href="/request-list" className="block hover:text-gray-300"> - 발행/환불 관리</Link>
                </div>
              )}
            </div>
        {/* 고객지원 메뉴 */}
        <div>
          <h2 className="text-lg font-semibold mb-2 cursor-pointer p-2 rounded flex items-center justify-between">
            <span>이용자 관리</span>
          </h2>
        </div>
        {/* 시스템 관리 메뉴 */}
        <div>
          <h2 className="text-lg font-semibold mb-2 cursor-pointer p-2 rounded flex items-center justify-between">
            <span>시스템 관리</span>
          </h2>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
