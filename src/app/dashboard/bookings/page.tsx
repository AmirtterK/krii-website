// Fixed bookings page
import { BookingsTable } from "@/src/components/bookings-table";
import { getServerClient } from "@/src/lib/supabase";

async function getBookings() {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("bookings")
    .select(`
      *,
      rental_requests!request_id(
        *,
        items!item_id(title, photos),
        borrower:users!borrower_id(first_name, last_name, email),
        owner:users!owner_id(first_name, last_name, email)
      )
    `)
    .order("confirmed_at", { ascending: false });

  if (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
  
  console.log('Sample booking data:', data?.[0]);
  return data;
}

export default async function Page() {
  const bookings = await getBookings();

  return (
    <div className="container mx-auto py-10">
      <BookingsTable data={bookings} />
    </div>
  );
}