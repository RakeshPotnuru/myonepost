import Feed from "./feed";
import Sidebar from "./sidebar";

export default function HomePage() {
  return (
    <div className="flex h-screen flex-row divide-x">
      <aside className="basis-1/3">
        <Sidebar />
      </aside>
      <div className="basis-1/2">
        <Feed />
      </div>
      <div className="basis-1/3"></div>
    </div>
  );
}
