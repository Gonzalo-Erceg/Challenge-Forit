import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
const RootLayout = () => (
  <>
    <div className="flex justify-around shadow-lg h-[10vh] items-center">
      <div>
        <img src="/0.png" className="w-50" />
      </div>
      <div>
        <img src="/1.png" className="w-50" />
      </div>
    </div>

    <Outlet></Outlet>
    <TanStackRouterDevtools></TanStackRouterDevtools>
  </>
);

export const Route = createRootRoute({ component: RootLayout });
