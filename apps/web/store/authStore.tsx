import create from "zustand";
import { gql } from "@apollo/client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apolloClient } from "../pages/_app";
import { logger } from "../config/logging";

interface AuthState {
  token: string;
  login: (username: string, password: string) => void;
  logout: () => void;
  getToken: () => void;
}

export function getToken() {
  const tokenString = sessionStorage.getItem("token");
  logger.info('tokenString', tokenString)
  return tokenString;
}

export const useStore = create<AuthState>((set) => ({
  // initial state
  token: "",
  // methods for manipulating state
  login: async (username, password) => {
    try {
      const QUERY = gql`
mutation {
  loginUser(
    loginUserInput: {
      email: "${username}",
      password: "${password}"
    }
  ) {
    access_token
  }
}
`;
      const response = await apolloClient.mutate({
        mutation: QUERY
      })
      toast.success("Login successfully");
      set({ token: response.data.loginUser.access_token });
      sessionStorage.setItem("token", response.data.loginUser.access_token);

    } catch (error: any) {
      toast.error(error.message);
    }
  },
  logout: () => {
    set({ token: "" });
    sessionStorage.removeItem("token");
  },
  getToken: () => {
    const token = getToken();
    if (token) {
      set({ token: token });
      return;
    }
  },
}));
