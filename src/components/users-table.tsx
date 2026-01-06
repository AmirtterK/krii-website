"use client";

import { userColumns } from "@/src/lib/table-configs";
import { userTabs } from "@/src/lib/table-tabs";
import { DynamicDataTable } from "@/src/components/dynamic-data-table";

export function UsersTable({ data }: { data: any[] }) {
  // Transform data: add 'name' field by concatenating first_name and last_name
  const transformedData = data.map(user => ({
    ...user,
    name: `${user.first_name || ''} ${user.last_name || ''}`.trim()
  }));

  return (
    <DynamicDataTable
      columns={userColumns}
      data={transformedData}
      searchKey="name"
      searchPlaceholder="Search by name..."
      enableDragDrop={false}
      tabs={userTabs}
    />
  );
}
