"use client";

import { DynamicDataTable } from '@/src/components/dynamic-data-table';
import { bookingColumns } from '@/src/lib/table-configs';
import { bookingTabs } from '@/src/lib/table-tabs';

export function BookingsTable({ data }: { data: any[] }) {
  const transformedData = data.map(booking => ({
    ...booking,
    item_title: booking.rental_requests?.items?.title 
      || booking.item_title 
      || 'Unknown Item',
    borrower_name: booking.rental_requests?.borrower?.first_name 
      ? `${booking.rental_requests.borrower.first_name} ${booking.rental_requests.borrower.last_name}`.trim()
      : booking.borrower_name || 'Unknown'
  }));

  return (
    <DynamicDataTable
      columns={bookingColumns}
      data={transformedData}
      searchKey="borrower_name"
      searchPlaceholder="Search by borrower..."
      enableDragDrop={false}
      tabs={bookingTabs}
    />
  );
}
