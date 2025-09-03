// Sidebar.tsx
import { menuItems } from "@/constants/menu";
import { Collapse, List, ListItemButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
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
              onClick={() => (hasChildren ? toggleMenu(item.title) : undefined)}
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
                {item?.children?.map((child) => (
                  <Link
                    key={child.path}
                    href={child.path}
                    onClick={(e) => {
                      if (!child.active) {
                        e.preventDefault(); // 링크 이동 방지
                      }
                    }}
                    className={child.active ? "on" : "disabled-link"}
                  >
                    <span>-</span> {child.title}
                  </Link>
                ))}
              </Collapse>
            )}
          </Fragment>
        );
      })}
    </List>
  );
};

export default Sidebar;
