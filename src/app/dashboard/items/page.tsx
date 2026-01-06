// Fixed items page
import { getServerClient } from "@/src/lib/supabase";
import { ItemsTable } from "@/src/components/items-table";

async function getItems() {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("items")
    .select(`
      *,
      owner:users!owner_id(first_name, last_name, email),
      category:categories(name)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
  
  console.log('Sample item data:', data?.[0]);
  return data;
}

export default async function Page() {
  const items = await getItems();

  return (
    <div className="container mx-auto py-10">
      <ItemsTable data={items} />
    </div>
  );
}