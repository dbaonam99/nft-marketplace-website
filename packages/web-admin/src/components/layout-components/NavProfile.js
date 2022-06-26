import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
import {
  LogoutOutlined
} from '@ant-design/icons';
import { useMoralis } from "react-moralis";


export const NavProfile = () => {
  const profileImg = "/img/avatars/thumb-1.jpg";
  const { logout } = useMoralis();

  const handleLogout = () => {
    logout();
  }

  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <Avatar size={45} src={profileImg} />
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
          <Avatar src={profileImg} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
}

export default NavProfile
