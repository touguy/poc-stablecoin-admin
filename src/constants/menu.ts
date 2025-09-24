// src/constants/menu.ts
export const menuItems = [
  {
    title: "발행/환불 관리",
    iconSrc: "/admin/images/icon_file.svg",
    children: [
      {
        title: "발행/환불 현황",
        path: "/request/status",
        active: false,
       
      },
      {
        title: "발행/환불 관리",
        path: "/request/manage",
        active: true,
      },
    ],
  },
  {
    title: "이용자 관리",
    iconSrc: "/admin/images/icon_user.svg",
  },
  {
    title: "시스템 관리",
    iconSrc: "/admin/images/icon_setting.svg",
  },
];
