// Sidebar.tsx
"use client";

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
  const pathname = usePathname(); // 현재 경로
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  // ✅ 현재 경로에 따라 해당 상위 메뉴 열기
  useEffect(() => {
    const newOpenMenus: Record<string, boolean> = {};

    menuItems.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some(
          (child) => pathname === child.path
        );
        if (hasActiveChild) {
          newOpenMenus[item.title] = true;
        }
      }
    });

    setOpenMenus(newOpenMenus);
  }, [pathname]);

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
        const isOpen = openMenus[item.title] || false;
        const iconSrc = item.iconSrc;

        return (
          <Fragment key={item.title}>
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
