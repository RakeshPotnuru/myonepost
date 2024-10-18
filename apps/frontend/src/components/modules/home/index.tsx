"use client";

import { useEffect } from "react";

import Footer from "@/components/common/layouts/footer";
import useUserStore from "@/lib/store/user";
import client from "@/utils/api-client";

import Feed from "./feed";
import Sidebar from "./sidebar";

export default function HomePage() {
  const { setUser } = useUserStore();

  const { data } = client.useQuery("get", "/user/me");

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return (
    <div className="flex flex-row">
      <aside className="basis-1/3">
        <Sidebar />
      </aside>
      <div className="basis-1/2">
        <Feed />
      </div>
      <div className="basis-1/3">
        <Footer />
      </div>
    </div>
  );
}
