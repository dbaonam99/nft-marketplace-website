import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Form, Alert, notification } from "antd";
import PropTypes from "prop-types";
import {
  signIn,
  showLoading,
  showAuthMessage,
  hideAuthMessage,
} from "redux/actions/Auth";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { useMoralis } from "react-moralis";
import { useCheckIsAdmin } from "queries/Admin";

export const LoginForm = (props) => {
  let history = useHistory();

  const { loading, showMessage, message } = props;
  const { authenticate, isAuthenticated, logout, user } = useMoralis();
  const { data } = useCheckIsAdmin(isAuthenticated, user?.get("ethAddress"));

  useEffect(() => {
    if (data) {
      history.push("/app/dashboard");
    } else {
      notification.error({
        message: "Bạn không có quyền truy cập!",
      });
      logout();
    }
  }, [data]);

  const onLogin = async () => {
    authenticate();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: showMessage ? 1 : 0,
          marginBottom: showMessage ? 20 : 0,
        }}
      >
        <Alert type="error" showIcon message={message}></Alert>
      </motion.div>
      <Form layout="vertical" name="login-form" onFinish={onLogin}>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Connect Wallet to Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

LoginForm.propTypes = {
  otherSignIn: PropTypes.bool,
  showForgetPassword: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

LoginForm.defaultProps = {
  otherSignIn: true,
  showForgetPassword: false,
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
  signIn,
  showAuthMessage,
  showLoading,
  hideAuthMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
