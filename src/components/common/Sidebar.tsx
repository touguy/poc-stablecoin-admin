// Sidebar.tsx
"use client";

// 이 컴포넌트는 애플리케이션의 탐색 메뉴(사이드바)를 렌더링합니다.
// 현재 경로에 따라 활성화된 메뉴와 펼쳐져야 할 하위 메뉴를 동적으로 관리합니다.
import { menuItems } from "@/constants/menu";
import {
  Collapse,
  List,
  ListItemButton,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

const Sidebar = () => {
  // 현재 URL 경로를 가져옵니다.
  const pathname = usePathname(); // 현재 경로
  // 각 메뉴 항목의 펼침 상태를 관리합니다.
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  /**
   * 컴포넌트가 마운트되거나 경로가 변경될 때, 현재 경로에 따라 메뉴의 펼침 상태를 초기화합니다.
   */
  useEffect(() => {
    const newOpenMenus: Record<string, boolean> = {};

    menuItems.forEach((item) => {
      if (item.children) {
        // 자식 메뉴 중 현재 경로와 일치하는 것이 있는지 확인합니다.
        const hasActiveChild = item.children.some(
          (child) => pathname === child.path
        );
        if (hasActiveChild) {
          newOpenMenus[item.title] = true; // 해당 상위 메뉴를 열어줍니다.
        }
      }
    });

    setOpenMenus(newOpenMenus);
  }, [pathname]);

  /**
   * 메뉴 항목의 펼침/접힘 상태를 토글합니다.
   */
  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <List component="nav" data-sidemenu>
      {menuItems.map((item) => {
        const hasChildren = Array.isArray(item.children);
        // 현재 메뉴의 펼침 상태를 가져옵니다.
        const isOpen = openMenus[item.title] || false;
        const iconSrc = item.iconSrc;

        return (
          <Fragment key={item.title}>
            {/* 메인 메뉴 버튼 */}
            <ListItemButton
              className={isOpen ? "on" : ""}
              onClick={() =>
                hasChildren ? toggleMenu(item.title) : undefined
              }
            >
              <Image
                src={iconSrc}
                alt="아이콘 이미지"
                width={20}
                height={20}
                style={{ width: "2rem", height: "2rem" }}
              />
              {item.title}
            </ListItemButton>

            {/* 자식 메뉴가 있는 경우 Collapse 컴포넌트로 하위 메뉴를 렌더링 */}
            {hasChildren && (
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                {item?.children?.map((child) => {
                  const isActive = pathname === child.path;

                  return (
                    <Link
                      key={child.path}
                      href={child.path}
                      onClick={(e) => {
                        if (!child.active) {
                          e.preventDefault();
                        }
                      }}
                      className={
                        isActive
                          ? "on"
                          : child.active
                          ? ""
                          : "disabled-link"
                      }
                    >
                      <span>-</span> {child.title}
                    </Link>
                  );
                })}
              </Collapse>
            )}
          </Fragment>
        );
      })}
    </List>
  );
};

export default Sidebar;
