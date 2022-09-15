import { Menu } from "antd";

import Sider from "antd/lib/layout/Sider";
import React from "react";
import { useRouter } from 'next/router'


const SiteSidebar = () => {
  const router = useRouter();

  const items = [
    {
      label: "Todos",
      key: "todos",
      children: [
        {
          label: "List",
          key: "todo-list",
          onClick: () => {
            router.push("/todo/");
          },
        },
        {
          label: "Create",
          key: "todo-create",
          onClick: () => {
            router.push("/todo/create");
          },
        },
      ],
    },
  ];

  return (
    <Sider className="site-layout-background" width={200} collapsible>
      <Menu theme="dark" mode="inline" items={items}></Menu>
    </Sider>
  );
};

export default SiteSidebar;
