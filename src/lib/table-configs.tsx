"use client";

// lib/table-configs.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";

// ============================================================================
// USER COLUMNS
// ============================================================================

export const userColumns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        
        <div>
          <div className="font-medium">
            {row.original.first_name} {row.original.last_name}
          </div>
          <div className="text-sm text-muted-foreground">
            {row.original.email}
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "phone_number",
    header: "Phone",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.original.phone_number || "-"}
      </span>
    ),
  },
  {
    accessorKey: "vacation_mode",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.vacation_mode ? "secondary" : "default"}>
        {row.original.vacation_mode ? "On Vacation" : "Active"}
      </Badge>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Joined",
    cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString(),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <IconDotsVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/users/${row.original.user_id}`}>View Details</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Suspend User</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

// ============================================================================
// ITEM COLUMNS (NO PHOTOS)
// ============================================================================

export const itemColumns: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: "Item",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.title}</div>
        <div className="text-sm text-muted-foreground">
          {row.original.description?.substring(0, 50)}...
        </div>
      </div>
    ),
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => (
      <span>
        {row.original.owner?.first_name} {row.original.owner?.last_name}
      </span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.category?.name || "-"}</Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusColors = {
        APPROVED: "bg-green-100 text-green-800",
        PENDING: "bg-yellow-100 text-yellow-800",
        REJECTED: "bg-red-100 text-red-800",
        UNDER_REVIEW: "bg-blue-100 text-blue-800",
      };
      return (
        <Badge
          className={
            statusColors[row.original.status as keyof typeof statusColors]
          }
        >
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "average_rating",
    header: "Rating",
    cell: ({ row }) => (
      <span>
        ⭐ {row.original.average_rating.toFixed(1)} (
        {row.original.total_reviews})
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <IconDotsVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/items/${row.original.item_id}`}>View Details</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Approve</DropdownMenuItem>
          <DropdownMenuItem>Reject</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

// ============================================================================
// RENTAL REQUEST COLUMNS
// ============================================================================

export const requestColumns: ColumnDef<any>[] = [
  {
    accessorKey: "items",
    header: "Item",
    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.items?.title || "Unknown Item"}
      </span>
    ),
  },
  {
    accessorKey: "borrower_name",
    header: "Borrower",
    cell: ({ row }) => (
      <span>
        {row.original.borrower?.first_name || "Unknown"}{" "}
        {row.original.borrower?.last_name || ""}
      </span>
    ),
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => (
      <span>
        {row.original.owner?.first_name || "Unknown"}{" "}
        {row.original.owner?.last_name || ""}
      </span>
    ),
  },
  {
    accessorKey: "start_date",
    header: "Dates",
    cell: ({ row }) => (
      <div className="text-sm">
        {new Date(row.original.start_date).toLocaleDateString()} -{" "}
        {new Date(row.original.end_date).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusColors = {
        PENDING: "bg-yellow-100 text-yellow-800",
        ACCEPTED: "bg-green-100 text-green-800",
        REJECTED: "bg-red-100 text-red-800",
        EXPIRED: "bg-gray-100 text-gray-800",
        CANCELLED: "bg-blue-100 text-blue-800",
      };
      return (
        <Badge
          className={
            statusColors[row.original.status as keyof typeof statusColors]
          }
        >
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <IconDotsVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/requests/${row.original.request_id}`}>
              View Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Cancel Request</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

// ============================================================================
// BOOKING COLUMNS
// ============================================================================

export const bookingColumns: ColumnDef<any>[] = [
  {
    id: "item",

    accessorKey: "rental_requests",
    header: "Item",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.original.rental_requests?.items?.title || "Unknown Item"}
      </div>
    ),
  },
  {
    accessorKey: "borrower_name",
    header: "Borrower",
    cell: ({ row }) => (
      <span>
        {row.original.rental_requests?.borrower?.first_name || "Unknown"}{" "}
        {row.original.rental_requests?.borrower?.last_name || ""}
      </span>
    ),
  },
  {
    accessorKey: "dates",
    header: "Period",
    cell: ({ row }) => (
      <div className="text-sm">
        {new Date(row.original.start_time).toLocaleDateString()} -{" "}
        {new Date(row.original.return_time).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusColors = {
        CONFIRMED: "bg-blue-100 text-blue-800",
        IN_PROGRESS: "bg-yellow-100 text-yellow-800",
        COMPLETED: "bg-green-100 text-green-800",
        CANCELLED: "bg-red-100 text-red-800",
      };
      return (
        <Badge
          className={
            statusColors[row.original.status as keyof typeof statusColors]
          }
        >
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "confirmed_at",
    header: "Confirmed",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.original.confirmed_at).toLocaleDateString()}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <IconDotsVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/bookings/${row.original.booking_id}`}>
              View Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">
            Cancel Booking
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

// ============================================================================
// MERCHANT COLUMNS
// ============================================================================

export const merchantColumns: ColumnDef<any>[] = [
  {
    accessorKey: "business_name",
    header: "Business Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.business_name}</div>
    ),
  },
  {
    accessorKey: "user",
    header: "Owner",
    cell: ({ row }) => (
      <div>
        <div>
          {row.original.user?.first_name} {row.original.user?.last_name}
        </div>
        <div className="text-sm text-muted-foreground">
          {row.original.user?.email}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "business_license",
    header: "License",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.business_license || "-"}
      </span>
    ),
  },
  {
    accessorKey: "verified_status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.verified_status ? "default" : "secondary"}>
        {row.original.verified_status ? "Verified" : "Pending"}
      </Badge>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Joined",
    cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString(),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <IconDotsVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/merchants/${row.original.merchant_id}`}>
              View Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Verify Merchant</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">Suspend</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
