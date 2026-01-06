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
    accessorKey: "name", // Expects 'name' field (first_name + last_name concatenated)
    header: "Name",
    cell: ({ row }) => {
      const firstName = row.original.first_name;
      const lastName = row.original.last_name;
      const profilePhoto = row.original.profile_photo;
      
      return (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            {profilePhoto ? (
              <img src={profilePhoto} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="text-gray-600 text-sm font-medium">
                {firstName?.[0] || row.original.email?.[0]?.toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <div className="font-medium">{firstName} {lastName}</div>
            <div className="text-sm text-muted-foreground">{row.original.email}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "phone_number",
    header: "Phone",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.phone_number || "-"}</span>
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
    cell: ({ row }) => {
      return row.original.created_at ? new Date(row.original.created_at).toLocaleDateString() : '-';
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const userId = row.original.user_id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <IconDotsVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/users/${userId}`}>View Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Suspend User</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// ============================================================================
// ITEM COLUMNS
// ============================================================================

export const itemColumns: ColumnDef<any>[] = [
  {
    accessorKey: "title", // Direct field from DB
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
    accessorKey: "owner_name", // Expects 'owner_name' field (joined from users table)
    header: "Owner",
    cell: ({ row }) => (
      <span>{row.original.owner_name || "Unknown"}</span>
    ),
  },
  {
    accessorKey: "category_name", // Expects 'category_name' field (joined from categories table)
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.category_name || "-"}</Badge>
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
        <Badge className={statusColors[row.original.status as keyof typeof statusColors]}>
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "average_rating",
    header: "Rating",
    cell: ({ row }) => {
      const avgRating = row.original.average_rating;
      const totalReviews = row.original.total_reviews;
      return (
        <span>⭐ {parseFloat(avgRating || 0).toFixed(1)} ({totalReviews || 0})</span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const itemId = row.original.item_id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <IconDotsVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/items/${itemId}`}>View Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Approve</DropdownMenuItem>
            <DropdownMenuItem>Reject</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// ============================================================================
// RENTAL REQUEST COLUMNS
// ============================================================================

export const requestColumns: ColumnDef<any>[] = [
  {
    accessorKey: "item_title", // Expects 'item_title' field (joined from items table)
    header: "Item",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.item_title || "Unknown Item"}</span>
    ),
  },
  {
    accessorKey: "borrower_name", // Expects 'borrower_name' field (joined from users table)
    header: "Borrower",
    cell: ({ row }) => (
      <span>{row.original.borrower_name || "Unknown"}</span>
    ),
  },
  {
    accessorKey: "owner_name", // Expects 'owner_name' field (joined from users table)
    header: "Owner",
    cell: ({ row }) => (
      <span>{row.original.owner_name || "Unknown"}</span>
    ),
  },
  {
    accessorKey: "start_date",
    header: "Dates",
    cell: ({ row }) => {
      const startDate = row.original.start_date;
      const endDate = row.original.end_date;
      return (
        <div className="text-sm">
          {startDate ? new Date(startDate).toLocaleDateString() : '-'} -{" "}
          {endDate ? new Date(endDate).toLocaleDateString() : '-'}
        </div>
      );
    },
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
        <Badge className={statusColors[row.original.status as keyof typeof statusColors]}>
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const requestId = row.original.request_id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <IconDotsVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/requests/${requestId}`}>View Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Cancel Request</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// ============================================================================
// BOOKING COLUMNS
// ============================================================================

export const bookingColumns: ColumnDef<any>[] = [
  {
    accessorKey: "item_title", // Expects 'item_title' field (joined through rental_requests -> items)
    header: "Item",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.item_title || "Unknown Item"}</div>
    ),
  },
  {
    accessorKey: "borrower_name", // Expects 'borrower_name' field (joined through rental_requests -> users)
    header: "Borrower",
    cell: ({ row }) => (
      <span>{row.original.borrower_name || "Unknown"}</span>
    ),
  },
  {
    accessorKey: "dates",
    header: "Period",
    cell: ({ row }) => {
      const startTime = row.original.start_time;
      const returnTime = row.original.return_time;
      return (
        <div className="text-sm">
          {startTime ? new Date(startTime).toLocaleDateString() : '-'} -{" "}
          {returnTime ? new Date(returnTime).toLocaleDateString() : '-'}
        </div>
      );
    },
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
        <Badge className={statusColors[row.original.status as keyof typeof statusColors]}>
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "confirmed_at",
    header: "Confirmed",
    cell: ({ row }) => {
      const confirmedAt = row.original.confirmed_at;
      return (
        <span className="text-sm text-muted-foreground">
          {confirmedAt ? new Date(confirmedAt).toLocaleDateString() : '-'}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const bookingId = row.original.booking_id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <IconDotsVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/bookings/${bookingId}`}>View Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Cancel Booking</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
