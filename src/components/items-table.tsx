"use client";

import { DynamicDataTable } from '@/src/components/dynamic-data-table';
import { itemColumns } from '@/src/lib/table-configs';
import { itemTabs } from '@/src/lib/table-tabs';

export function ItemsTable({ data }: { data: any[] }) {
  // Transform data: Add searchable fields from joined data
  const transformedData = data.map(item => ({
    ...item,
    // If owner is a nested object, extract the name
    owner_name: item.owner?.first_name 
      ? `${item.owner.first_name} ${item.owner.last_name}`.trim()
      : item.owner_name || 'Unknown',
    // If category is a nested object, extract the name
    category_name: item.category?.name || item.category_name || '-'
  }));

  return (
    <DynamicDataTable
      columns={itemColumns}
      data={transformedData}
      searchKey="title"
      searchPlaceholder="Search by title..."
      enableDragDrop={false}
      tabs={itemTabs}
    />
  );
}
