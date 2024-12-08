import {
  ChevronDown,
  ChevronUp,
  DollarSign,
  Handshake,
  Home,
  Inbox,
  LayoutGrid,
  Lock,
  Settings,
  User2,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
    links: [
      {
        title: "Invoices",
        href: "/dashboard/invoices",
        icon: DollarSign,
      },
      {
        title: "Payments",
        href: "/dashboard/payments",
        icon: Handshake,
      },
    ],
  },
  {
    header: "Team",
    links: [
      {
        title: "Members",
        href: "/dashboard/members",
        icon: User2,
      },
      {
        title: "Roles",
        href: "/dashboard/roles",
        icon: Lock,
      },
    ],
  },
  {
    header: "Communication",
    links: [
      {
        title: "Emails",
        href: "/dashboard/emails",
        icon: Inbox,
      },
      {
        title: "Bulk Emails",
        href: "/dashboard/bulk-emails",
        icon: Lock,
      },
    ],
  },
  {
    header: "Portfolio",
    links: [
      {
        title: "Generate Portfolio",
        href: "/dashboard/generate-portfolio",
        icon: Inbox,
      },
    ],
  },
  {
    header: "Brand",
    links: [
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
      {
        title: "File Manager",
        href: "/dashboard/file-manager",
        icon: Lock,
      },
    ],
  },
  {
    header: "Reports",
    links: [
      {
        title: "Project Progress",
        href: "/dashboard/project-progress",
        icon: Inbox,
      },
      {
        title: "Financial Summary",
        href: "/dashboard/financial-summary",
        icon: Inbox,
      },
      {
        title: "Time Tracking",
        href: "/dashboard/time-tracking",
        icon: Inbox,
      },
    ],
  },
  {
    header: "Settings",
    links: [
      {
        title: "Account Settings",
        href: "/dashboard/account-settings",
        icon: Inbox,
      },
      {
        title: "Notifications",
        href: "/dashboard/notifications",
        icon: Inbox,
      },
      {
        title: "Integrations",
        href: "/dashboard/integrations",
        icon: Inbox,
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  Select Workspace
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>Acme Inc</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Acme Corp.</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
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
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
