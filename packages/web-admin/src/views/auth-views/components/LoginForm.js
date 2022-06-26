import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Button, Form, Alert } from "antd";
import PropTypes from 'prop-types';
import { 
	signIn, 
	showLoading, 
	showAuthMessage, 
	hideAuthMessage, 
} from 'redux/actions/Auth';
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion"
import { useMoralis } from 'react-moralis';

export const LoginForm = (props) => {
	let history = useHistory();

	const { 
		loading,
		showMessage,
		message,
	} = props;
  const { authenticate, isAuthenticated } = useMoralis();

	useEffect(() => {
		if (isAuthenticated) history.push("/app/dashboard");
	}, [isAuthenticated]);

	const onLogin = async (values) => {
    authenticate();
	};

	return (
		<>
			<motion.div 
				initial={{ opacity: 0, marginBottom: 0 }} 
				animate={{ 
					opacity: showMessage ? 1 : 0,
					marginBottom: showMessage ? 20 : 0 
				}}> 
				<Alert type="error" showIcon message={message}></Alert>
			</motion.div>
			<Form 
				layout="vertical" 
				name="login-form"
				onFinish={onLogin}
			>
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading}>
						Connect Wallet to Login
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}

LoginForm.propTypes = {
	otherSignIn: PropTypes.bool,
	showForgetPassword: PropTypes.bool,
	extra: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

LoginForm.defaultProps = {
	otherSignIn: true,
	showForgetPassword: false
};

const mapStateToProps = ({auth}) => {
	const {loading, message, showMessage, token, redirect} = auth;
  return {loading, message, showMessage, token, redirect}
}

const mapDispatchToProps = {
	signIn,
	showAuthMessage,
	showLoading,
	hideAuthMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
