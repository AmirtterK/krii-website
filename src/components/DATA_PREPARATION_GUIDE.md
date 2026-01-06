# Data Preparation Guide

## Users Table - Add 'name' field

Before passing data to the UsersTable component, concatenate `first_name` and `last_name` into a `name` field.

### Option 1: In your API/Backend
When fetching users, add a computed field:

```sql
SELECT 
  *,
  CONCAT(first_name, ' ', last_name) as name
FROM users;
```

Or in your backend code:
```javascript
const users = await db.users.findMany();
const usersWithName = users.map(user => ({
  ...user,
  name: `${user.first_name} ${user.last_name}`.trim()
}));
```

### Option 2: In your React Component (Client-side)
Before passing to the table:

```typescript
// In your page.tsx or component
export default function UsersPage() {
  const { data: users } = useQuery(...);
  
  // Add the 'name' field
  const usersWithName = users?.map(user => ({
    ...user,
    name: `${user.first_name || ''} ${user.last_name || ''}`.trim()
  })) || [];
  
  return (
    <UsersTable data={usersWithName} />
  );
}
```

### Option 3: Using a Server Component with Supabase

```typescript
// app/dashboard/users/page.tsx
import { createClient } from '@/utils/supabase/server';
import { UsersTable } from '@/components/users-table';

export default async function UsersPage() {
  const supabase = createClient();
  const { data: users } = await supabase.from('users').select('*');
  
  // Add name field
  const usersWithName = users?.map(user => ({
    ...user,
    name: `${user.first_name || ''} ${user.last_name || ''}`.trim()
  })) || [];
  
  return <UsersTable data={usersWithName} />;
}
```

## What This Gives You

With the `name` field containing the full name, the search will work on the full name string, so:

- Searching "John" → finds "John Doe"
- Searching "Doe" → finds "John Doe"  
- Searching "John Doe" → finds "John Doe"

The search is case-insensitive by default in TanStack Table, so "john", "JOHN", and "John" all work the same.

## For Other Tables

Apply the same pattern for:

### Items Table
Already works - uses `title` field directly

### Requests Table  
If your API returns nested borrower/owner objects, you can either:
1. Add `borrower_name` field in the backend
2. Or keep the current setup with `accessorFn` (already handles this)

### Bookings Table
Same as requests - current setup with `accessorFn` already handles nested data
