import { getServerClient } from "@/src/lib/supabase";
import { UsersTable } from "@/src/components/users-table";

async function getUsers() {
  const supabase = getServerClient(); 
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export default async function Page() {
  const users = await getUsers();

  return (
    <div className="container mx-auto py-10">
      <UsersTable data={users} />
    </div>
  );
}