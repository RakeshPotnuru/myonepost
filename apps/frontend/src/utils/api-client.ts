import type { paths } from "@1post/client-sdk";
import type { InternalAxiosRequestConfig } from "axios";
import Axios from "axios";
import type { Middleware } from "openapi-fetch";
import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";

import { createClient as createSupabaseClient } from "./supabase/client";

const supabase = createSupabaseClient();

async function getAccessToken() {
  return (await supabase.auth.getSession()).data.session?.access_token;
}

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const token = await getAccessToken();

    if (token) {
      request.headers.set("authorization", `Bearer ${token}`);
    }

    return request;
  },
};

const fetchClient = createFetchClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});

fetchClient.use(authMiddleware);

const client = createClient(fetchClient);

export default client;
export { fetchClient };

async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.Accept = "application/json";
  return config;
}

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
