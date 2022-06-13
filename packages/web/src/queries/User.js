import { useQuery } from "react-query";
import axios from "axios";

export const useGetUserInfoQuery = ({ ethAddress }) => {
  return useQuery("userInfo", async () => {
    if (!ethAddress) return;

    const res = await axios({
      method: "get",
      url: `https://2l73cwdg74st.usemoralis.com:2053/server/classes/_User?where={"ethAddress": "${ethAddress.toLowerCase()}"}`,
      headers: {
        "X-Parse-Application-Id": "Avri8wAWWBtxABoSRxUkgTxhj3ThZ06aezKxJIXf",
        "X-Parse-Master-Key": "GWHYr9DtrD7sTxvgNweXBxtnJ7IWfXxR9ehihQmx",
      },
    });

    return res?.data?.results[0];
  });
};
