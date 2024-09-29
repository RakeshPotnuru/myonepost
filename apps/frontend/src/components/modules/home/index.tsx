import Footer from "@/components/common/layouts/footer";

import Feed from "./feed";
import Sidebar from "./sidebar";

export default function HomePage() {
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
