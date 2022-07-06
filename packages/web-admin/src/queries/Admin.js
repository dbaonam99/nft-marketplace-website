import { ethers } from "ethers";
import { useQuery } from "react-query";
import { ADMIN_ADDRESS } from "../contracts/Admin.address";
import Admin_ABI from "../contracts/contracts/Admin.sol/Admin.json";

export const useCheckIsAdmin = (enabled) => {
  return useQuery(
    "isAdmin",
    async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        "http://localhost:8545"
      );

      const adminContract = new ethers.Contract(
        ADMIN_ADDRESS,
        Admin_ABI,
        provider
      );

      const resp = await adminContract.checkIsAdmin();
      console.log(resp);
      return resp;
    },
    {
      enabled
    }
  );
};