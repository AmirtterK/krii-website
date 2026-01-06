import {
  IconDashboard,
  IconListDetails,
  IconChartBar,
  IconFolder,
  IconUsers,
  IconCamera,
  IconFileDescription,
  IconFileAi,
  IconSettings,
  IconHelp,
  IconSearch,
  IconDatabase,
  IconReport,
  IconFileWord,
  IconGitPullRequest,
  IconMessage,
  IconBook,
  IconClipboardList,
} from "@tabler/icons-react";

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: IconDashboard,
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: IconUsers,
    },
    // {
    //   title: "Chats",
    //   url: "/dashboard/chats",
    //   icon: IconMessage,
    // },
    {
      title: "Requests",
      url: "/dashboard/requests",
      icon: IconClipboardList,
    },
    {
      title: "Items",
      url: "/dashboard/items",
      icon: IconListDetails,
    },
    {
      title: "Bookings",
      url: "/dashboard/bookings",
      icon: IconBook,
    },
    {
      title: "Moderators",
      url: "/dashboard/moderators",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "/dashboard/analytics",
      items: [
        {
          title: "Active Proposals",
          url: "/dashboard/analytics",
        },
        {
          title: "Archived",
          url: "/dashboard/analytics",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "/dashboard/analytics",
      items: [
        {
          title: "Active Proposals",
          url: "/dashboard/analytics",
        },
        {
          title: "Archived",
          url: "/dashboard/analytics",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "/dashboard/analytics",
      items: [
        {
          title: "Active Proposals",
          url: "/dashboard/analytics",
        },
        {
          title: "Archived",
          url: "/dashboard/analytics",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/analytics",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/dashboard/analytics",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "/dashboard/analytics",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "/dashboard/analytics",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "/dashboard/analytics",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "/dashboard/analytics",
      icon: IconFileWord,
    },
  ],
};
