"use client";

import { DynamicDataTable } from '@/src/components/dynamic-data-table';
import { requestColumns } from '@/src/lib/table-configs';
import { requestTabs } from '@/src/lib/table-tabs';

export function RequestsTable({ requests }: { requests: any[] }) {
  const transformedData = requests.map(request => ({
    ...request,
    item_title: request.item?.title || request.item_title || 'Unknown Item',
    borrower_name: request.borrower?.first_name 
      ? `${request.borrower.first_name} ${request.borrower.last_name}`.trim()
      : request.borrower_name || 'Unknown',
    owner_name: request.owner?.first_name 
      ? `${request.owner.first_name} ${request.owner.last_name}`.trim()
      : request.owner_name || 'Unknown'
  }));

  return (
    <DynamicDataTable
      columns={requestColumns}
      data={transformedData}
      searchKey="borrower_name"
      searchPlaceholder="Search by borrower..."
      enableDragDrop={false}
      tabs={requestTabs}
    />
  );
}
