import type { InternalAxiosRequestConfig } from "axios";
import Axios from "axios";

import { createClient } from "./supabase/client";

const client = createClient();

const authRequestInterceptor = async (config: InternalAxiosRequestConfig) => {
  const token = (await client.auth.getSession()).data.session?.access_token;

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
};

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = (error.response?.data?.message ||
      error.message ||
      "Something went wrong") as string;

    return Promise.reject(new Error(message));
  },
);
