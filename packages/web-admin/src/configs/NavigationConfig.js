import { 
  DashboardOutlined,
  PlaySquareOutlined,
  FileImageOutlined,
  BlockOutlined,
  UnorderedListOutlined,
  SettingOutlined,
  TeamOutlined,
  LineChartOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const lessDashBoardNavTree = [{
  key: 'home',
  path: `${APP_PREFIX_PATH}`,
  title: "Trang chủ",
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'home-dashboard',
      path: `${APP_PREFIX_PATH}/dashboard`,
      title: "Trang quản trị",
      icon: LineChartOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'home-film',
      path: `${APP_PREFIX_PATH}/films`,
      title: "Phim",
      permissonKey: "film",
      icon: PlaySquareOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'home-image',
      path: `${APP_PREFIX_PATH}/images`,
      title: "Hình ảnh",
      icon: FileImageOutlined,
      breadcrumb: true,
      permissonKey: "image",
      submenu: []
    },
    {
      key: 'home-ads',
      path: `${APP_PREFIX_PATH}/ads`,
      title: "Ads",
      permissonKey: "ads",
      icon: BlockOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'home-item',
      path: `${APP_PREFIX_PATH}/films`,
      title: "Danh sách",
      icon: UnorderedListOutlined,
      breadcrumb: false,
      submenu: [
        {
          key: 'home-item-category',
          permissonKey: "category",
          path: `${APP_PREFIX_PATH}/films/category`,
          title: "Thể loại",
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'home-item-country',
          permissonKey: "country",
          path: `${APP_PREFIX_PATH}/films/country`,
          title: "Quốc gia",
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'home-item-actor',
          path: `${APP_PREFIX_PATH}/films/actor`,
          title: "Diễn viên",
          permissonKey: "actor",
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'home-item-director',
          path: `${APP_PREFIX_PATH}/films/director`,
          title: "Đạo diễn",
          permissonKey: "director",
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'home-item-tags',
          path: `${APP_PREFIX_PATH}/films/tags`,
          title: "Tags",
          permissonKey: "tags",
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'home-item-server',
          path: `${APP_PREFIX_PATH}/films/server`,
          title: "Server",
          permissonKey: "server",
          breadcrumb: true,
          submenu: []
        },
      ],
    },
  ]
}]

const dashBoardNavTree = [{
  key: 'home',
  path: `${APP_PREFIX_PATH}`,
  title: "Trang chủ",
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'home-dashboard',
      path: `${APP_PREFIX_PATH}/dashboard`,
      title: "Trang quản trị",
      icon: LineChartOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'home-film',
      path: `${APP_PREFIX_PATH}/films`,
      title: "Phim",
      permissonKey: "film",
      icon: PlaySquareOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'home-image',
      path: `${APP_PREFIX_PATH}/images`,
      title: "Hình ảnh",
      icon: FileImageOutlined,
      breadcrumb: true,
      permissonKey: "image",
      submenu: []
    },
    {
      key: 'home-ads',
      path: `${APP_PREFIX_PATH}/ads`,
      title: "Ads",
      icon: BlockOutlined,
      breadcrumb: true,
      submenu: []
    },
    {
      key: 'home-item',
      path: `${APP_PREFIX_PATH}/films`,
      title: "Danh sách",
      icon: UnorderedListOutlined,
      breadcrumb: false,
      submenu: [
        {
          key: 'home-item-category',
          permissonKey: "category",
          path: `${APP_PREFIX_PATH}/films/category`,
          title: "Thể loại",
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'home-item-country',
          permissonKey: "country",
          path: `${APP_PREFIX_PATH}/films/country`,
          title: "Quốc gia",
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'home-item-actor',
          path: `${APP_PREFIX_PATH}/films/actor`,
          title: "Diễn viên",
          permissonKey: "actor",
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'home-item-director',
          path: `${APP_PREFIX_PATH}/films/director`,
          title: "Đạo diễn",
          permissonKey: "director",
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'home-item-tags',
          path: `${APP_PREFIX_PATH}/films/tags`,
          title: "Tags",
          permissonKey: "tags",
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'home-item-server',
          path: `${APP_PREFIX_PATH}/films/server`,
          title: "Server",
          permissonKey: "server",
          breadcrumb: true,
          submenu: []
        },
      ],
    },
    {
      key: 'home-permission',
      path: `${APP_PREFIX_PATH}/permission`,
      title: "Quyền hạn",
      icon: TeamOutlined,
      breadcrumb: false,
      submenu: [
        {
          key: 'home-permission-user',
          path: `${APP_PREFIX_PATH}/permission/user`,
          title: "Người dùng",
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'home-permission-feature',
          path: `${APP_PREFIX_PATH}/permission/feature`,
          title: "Chức năng",
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'home-permission-role',
          path: `${APP_PREFIX_PATH}/permission/role`,
          title: "Nhóm quyền",
          breadcrumb: true,
          submenu: []
        },
      ],
    },
    {
      key: 'home-options',
      path: `${APP_PREFIX_PATH}/settings`,
      title: "Cài đặt",
      icon: SettingOutlined,
      breadcrumb: true,
      submenu: []
    }
  ]
}]  

const checkPermission = (navs, permissions) => {
  return [...navs]?.map(item => {
    if (item.submenu && item.submenu.length > 0) {
      return {
        ...item,
        submenu: checkPermission(item.submenu, permissions)
      }
    }
    if (!item.permissonKey) return {...item }
    if (item.permissonKey && permissions.includes(item.permissonKey)) {
      return { ...item }
    } 
    return null
  }).filter(navItem => navItem);
}

const getNavigationConfig = (user) => {
  if (user?.data?.Role?.isMaster) return [...dashBoardNavTree];
  
  const permissions = [...user?.data?.Role?.RoleFeatures]?.map(item => {
    if (item.isAdd || item.isDelete || item.isEdit || item.isView) {
      return item?.Feature?.key
    }
  }).filter(elm => elm);
  const navs = checkPermission(lessDashBoardNavTree, permissions)
  return navs;
}


export default getNavigationConfig;
