import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
import {
  LogoutOutlined
} from '@ant-design/icons';
import { useMoralis } from "react-moralis";


export const NavProfile = () => {
  const profileImg = "/img/avatars/thumb-1.jpg";
  const { logout, user } = useMoralis();

  const handleLogout = () => {
    logout();
  }

  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <div style={{ flexSrink: 0, marginRight: "10px" }}>
            <Avatar size={45} src={user?.get("avatar") || profileImg} />
          </div>
          <span className="font-weight-normal">{user?.get("username")}</span>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          <Menu.Item onClick={handleLogout}>
            <span>
              <LogoutOutlined className="mr-3" />
              <span className="font-weight-normal">Sign Out</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );

  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item>
          <Avatar src={user?.get("avatar") || profileImg} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
}

export default NavProfile
