// Sidebar.tsx
import { menuItems } from "@/constants/menu";
import { Collapse, List, ListItemButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <List component="nav" data-sidemenu>
      {menuItems.map((item, index) => {
        const hasChildren = Array.isArray(item.children);
        const isOpen = openMenus[item.title] || false;
        const iconSrc = item.iconSrc;

        return (
          <>
            <ListItemButton
              key={item.title}
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
                    className={child.active ? "on" : ""}
                  >
                    <span>-</span> {child.title}
                  </Link>
                ))}
              </Collapse>
            )}
          </>
        );
      })}
    </List>
  );
};

export default Sidebar;
