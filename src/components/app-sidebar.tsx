import { ChevronUp, Home, LayoutGrid, User2, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { signOutUser } from "@/features/auth/actions";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const sidebarLinks = [
  {
    header: "Dashboard",
    links: [
      {
        title: "Overview",
        href: "/dashboard",
        icon: Home,
      },
    ],
  },
  {
    header: "Clients & Projects",
    links: [
      {
        title: "Clients",
        href: "/dashboard/clients",
        icon: Users,
      },
      {
        title: "Projects",
        href: "/dashboard/projects",
        icon: LayoutGrid,
      },
    ],
  },
  {
    header: "Finance",
    // links: [
    //   {
    //     title: "Invoices",
    //     href: "/dashboard/invoices",
    //     icon: DollarSign,
    //   },
    //   {
    //     title: "Payments",
    //     href: "/dashboard/payments",
    //     icon: Handshake,
    //   },
    // ],
  },
  {
    header: "Team",
    // links: [
    //   {
    //     title: "Members",
    //     href: "/dashboard/members",
    //     icon: User2,
    //   },
    //   {
    //     title: "Roles",
    //     href: "/dashboard/roles",
    //     icon: Lock,
    //   },
    // ],
  },
  {
    header: "Communication",
    // links: [
    //   {
    //     title: "Emails",
    //     href: "/dashboard/emails",
    //     icon: Inbox,
    //   },
    //   {
    //     title: "Bulk Emails",
    //     href: "/dashboard/bulk-emails",
    //     icon: Lock,
    //   },
    // ],
  },
  {
    header: "Portfolio",
    // links: [
    //   {
    //     title: "Generate Portfolio",
    //     href: "/dashboard/generate-portfolio",
    //     icon: Inbox,
    //   },
    // ],
  },
  {
    header: "Brand",
    // links: [
    //   {
    //     title: "Settings",
    //     href: "/dashboard/settings",
    //     icon: Settings,
    //   },
    //   {
    //     title: "File Manager",
    //     href: "/dashboard/file-manager",
    //     icon: Lock,
    //   },
    // ],
  },
  {
    header: "Reports",
    // links: [
    //   {
    //     title: "Project Progress",
    //     href: "/dashboard/project-progress",
    //     icon: Inbox,
    //   },
    //   {
    //     title: "Financial Summary",
    //     href: "/dashboard/financial-summary",
    //     icon: Inbox,
    //   },
    //   {
    //     title: "Time Tracking",
    //     href: "/dashboard/time-tracking",
    //     icon: Inbox,
    //   },
    // ],
  },
  {
    header: "Settings",
    // links: [
    //   {
    //     title: "Account Settings",
    //     href: "/dashboard/account-settings",
    //     icon: Inbox,
    //   },
    //   {
    //     title: "Notifications",
    //     href: "/dashboard/notifications",
    //     icon: Inbox,
    //   },
    //   {
    //     title: "Integrations",
    //     href: "/dashboard/integrations",
    //     icon: Inbox,
    //   },
    // ],
  },
];

interface AppSidebarProps {
  name: string;
  email: string;
}

export function AppSidebar({ name, email }: AppSidebarProps) {
  return (
    <Sidebar variant="inset" className="">
      <SidebarContent>
        {sidebarLinks.map(({ header, links }) => (
          <SidebarGroup key={header}>
            <SidebarGroupLabel>{header}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {links.map(({ title, href, icon: Icon }) => (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton asChild>
                      <a href={href}>
                        <Icon />
                        <span>{title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {name}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuLabel className="flex items-center space-y-1">
                  <User2 className="h-8 w-8" />
                  <div className="ml-2">
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-muted-foreground">{email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form
                    action={async () => {
                      "use server";

                      await signOutUser();
                    }}
                    className="w-full">
                    <button className="w-full text-left" type="submit">
                      Logout
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
