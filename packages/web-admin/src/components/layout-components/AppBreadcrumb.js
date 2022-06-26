import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import getNavigationConfig from "configs/NavigationConfig";
import { useSelector } from "react-redux";

let breadcrumbData = { 
	'/app' : <div>Home</div>  
};

const getBreadcrumb = (user) => {
  getNavigationConfig(user).forEach((elm, i) => {
    const assignBreadcrumb = (obj) => breadcrumbData[obj.path] = <span>{obj.title}</span>;
    assignBreadcrumb(elm);
    if (elm.submenu) {
      elm.submenu.forEach( elm => {
        assignBreadcrumb(elm)
        if(elm.submenu) {
          elm.submenu.forEach( elm => {
            assignBreadcrumb(elm)
          })
        }
      })
    }
  })
}

const BreadcrumbRoute = withRouter(props => {
	const { location } = props;
  const user = useSelector(state => state.auth.user);
  
  getBreadcrumb(user);

	const pathSnippets = location.pathname.split('/').filter(i => i);
	const buildBreadcrumb = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbData[url]}</Link>
      </Breadcrumb.Item>
    );
	});
  
  return (
		<Breadcrumb>
			{buildBreadcrumb}
		</Breadcrumb>
  );
});

export class AppBreadcrumb extends Component {
	render() {
		return (
			<BreadcrumbRoute />
		)
	}
}

export default AppBreadcrumb
