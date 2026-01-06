// app/requests/page.tsx
import { getServerClient } from '@/src/lib/supabase';
import { RequestsTable } from '@/src/components/requests-table';

async function getRequests() {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from('rental_requests')
    .select(`
      *,
      items!item_id(title, photos),
      borrower:users!borrower_id(first_name, last_name, email),
      owner:users!owner_id(first_name, last_name, email)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching requests:', error);
    throw error;
  }
  
  console.log('Sample request data:', data?.[0]);
  return data;
}

export default async function RequestsPage() {
  const requests = await getRequests();


  return (
    <div className="container mx-auto py-10">
        <RequestsTable requests={requests} />
      </div>
  );
}