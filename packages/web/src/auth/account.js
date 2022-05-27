import { ethers } from "ethers";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const [userInfo, setUserInfo] = useState();

  const getUserInfo = (info) => {
    console.log(info);
    // setUserInfo(address);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          if (accounts.length === 0) {
            console.log("Please connect to MetaMask.");
          } else if (accounts[0] !== userInfo?.address) {
            window.ethereum
              .request({
                method: "eth_getBalance",
                params: [accounts[0], "latest"],
              })
              .then((balance) => {
                setUserInfo({
                  address: accounts[0],
                  balance: ethers.utils.formatEther(balance),
                });
              });
          }
        })
        .catch((err) => {
          if (err.code === 4001) {
            console.log("Please connect to MetaMask.");
          } else {
            console.error(err);
          }
        });
    } else {
      alert("Install metamask extension!!");
    }
  }, [userInfo]);

  console.log("userInfo", userInfo);

  return (
    <AuthContext.Provider value={{ userInfo, getUserInfo }}>
      {props.children}
    </AuthContext.Provider>
  );
};
