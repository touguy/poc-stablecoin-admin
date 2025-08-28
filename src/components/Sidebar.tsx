import { menuItems } from "@/constants/menu";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };
  const { pathname } = useRouter();
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-4">
      <nav className="space-y-6">
        {menuItems.map((menu) => (
          <div key={menu.title}>
            <h2
              className={`text-lg font-semibold mb-2 cursor-pointer p-2 rounded flex items-center justify-between ${
                openMenus[menu.title] ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
              onClick={() => menu.children && toggleMenu(menu.title)}
            >
              <span>{menu.title}</span>
              {menu.children && (
                <span>{openMenus[menu.title] ? "−" : "+"}</span>
              )}
            </h2>

            {/* 2Depth 메뉴 */}
            {menu.children && openMenus[menu.title] && (
              <div className="space-y-2 pl-4">
                {menu.children.map((child) => {
                  const isActive = pathname === child.path;
                  return child.active ? (
                    <Link
                      key={child.path}
                      href={child.path}
                      className={`block px-2 py-1 rounded hover:bg-gray-700 ${
                        isActive
                          ? "bg-gray-700 font-semibold text-blue-300"
                          : ""
                      }`}
                    >
                      - {child.title}
                    </Link>
                  ) : (
                    <span
                      key={child.title}
                      className="block text-gray-300 cursor-not-allowed"
                    >
                      - {child.title}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
