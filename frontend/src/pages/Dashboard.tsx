import {
  Home,
  LineChart,
  Package2,
  PanelLeft,
  Settings,
  User2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { TooltipProvider } from "@/components/ui/tooltip";

import Demos from "@/components/Demos";
import { useFrameStore } from "@/stores/frame";
import { useFetch } from "@/hooks/useSRW";
import { LoadingSpinner } from "@/components/LoadingSpinner";

function Dashboard() {
  const cleanFrames = useFrameStore((state) => state.cleanFrames);
  cleanFrames();
  const { data: demos, error, isLoading } = useFetch<any>("/demos");

  if (error) return <div>Failed to load</div>;

  if (isLoading) return <LoadingSpinner/>
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <TooltipProvider>
          <nav className="flex flex-col items-center gap-4 px-2 py-4">
            <a
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Get Demo</span>
            </a>

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LineChart className="h-5 w-5" />
                  <span className="sr-only">Analytics</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right">Analytics</TooltipContent>
            </Tooltip>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </nav>
        </TooltipProvider>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b  bg-background px-4 sm:static sm:h-auto  sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <a
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Get Demo</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </a>
              </nav>
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <div className="flex justify-between items-center w-full px-6 py-2">
              <div className="flex flex-1 justify-center">
                <h2 className="text-2xl font-bold flex items-center">
                  <img
                    src="/assets/logoGetDemo.png"
                    alt="logo"
                    className="h-8 w-auto"
                  />
                </h2>
              </div>

              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <User2 className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
            </div>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main>
          <div className="container mx-auto px-6 py-10">
            {!isLoading &&(
              <>
                <h1 className="text-3xl font-bold mb-4 text-gray-800">
                  Olá, Deyvi dev!
                </h1>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-semibold text-gray-700">
                      Minhas demos{" "}
                      <span className="text-base font-normal text-gray-500">
                        {demos.length} demos
                      </span>
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Aqui você terá acesso a todas as demos.
                  </p>

                  <Demos  initialDemos={demos} />
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
