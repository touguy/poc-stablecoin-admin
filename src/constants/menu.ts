// src/constants/menu.ts
export const menuItems = [
  {
    title: "발행/환불 관리",
    children: [
      { title: "발행/환불 현황", path: "/request/status", active: false },
      { title: "발행/환불 관리", path: "/request/manage", active: true },
    ],
  },
  {
    title: "이용자 관리",
  },
  {
    title: "시스템 관리",
  },
];
