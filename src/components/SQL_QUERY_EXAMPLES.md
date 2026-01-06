# SQL Query Examples for Data Fetching

## Users Query
Simple - no joins needed. Just add the `name` field in your component.

```sql
SELECT * FROM users ORDER BY created_at DESC;
```

Then in component:
```typescript
const usersWithName = users.map(u => ({
  ...u,
  name: `${u.first_name || ''} ${u.last_name || ''}`.trim()
}));
```

---

## Items Query
Join with users (owner) and categories to get names.

```sql
SELECT 
  items.*,
  CONCAT(users.first_name, ' ', users.last_name) as owner_name,
  categories.name as category_name
FROM items
LEFT JOIN users ON items.owner_id = users.user_id
LEFT JOIN categories ON items.category_id = categories.category_id
ORDER BY items.created_at DESC;
```

**Supabase Example:**
```typescript
const { data: items } = await supabase
  .from('items')
  .select(`
    *,
    owner:users!owner_id(first_name, last_name),
    category:categories!category_id(name)
  `)
  .order('created_at', { ascending: false });
```

---

## Rental Requests Query
Join with items and users (borrower and owner) to get all names.

```sql
SELECT 
  rental_requests.*,
  items.title as item_title,
  CONCAT(borrower.first_name, ' ', borrower.last_name) as borrower_name,
  CONCAT(owner.first_name, ' ', owner.last_name) as owner_name
FROM rental_requests
LEFT JOIN items ON rental_requests.item_id = items.item_id
LEFT JOIN users AS borrower ON rental_requests.borrower_id = borrower.user_id
LEFT JOIN users AS owner ON rental_requests.owner_id = owner.user_id
ORDER BY rental_requests.created_at DESC;
```

**Supabase Example:**
```typescript
const { data: requests } = await supabase
  .from('rental_requests')
  .select(`
    *,
    item:items!item_id(title),
    borrower:users!borrower_id(first_name, last_name),
    owner:users!owner_id(first_name, last_name)
  `)
  .order('created_at', { ascending: false });
```

---

## Bookings Query
Join through rental_requests to get item and borrower info.

```sql
SELECT 
  bookings.*,
  items.title as item_title,
  CONCAT(borrower.first_name, ' ', borrower.last_name) as borrower_name
FROM bookings
LEFT JOIN rental_requests ON bookings.request_id = rental_requests.request_id
LEFT JOIN items ON rental_requests.item_id = items.item_id
LEFT JOIN users AS borrower ON rental_requests.borrower_id = borrower.user_id
ORDER BY bookings.created_at DESC;
```

**Supabase Example:**
```typescript
const { data: bookings } = await supabase
  .from('bookings')
  .select(`
    *,
    rental_requests!request_id(
      items!item_id(title),
      borrower:users!borrower_id(first_name, last_name)
    )
  `)
  .order('created_at', { ascending: false });
```

---

## Summary

### For PostgreSQL/Supabase Users:
Use the SQL queries above or Supabase's query builder with joins.

### For Any Database:
If your queries already return nested objects (like `item: { title: "..." }`), the table components will automatically flatten them for searching.

### Key Points:
1. **Users**: Add `name` field in component (first_name + last_name)
2. **Items**: Add `owner_name` and `category_name` via JOIN or in component
3. **Requests**: Add `item_title`, `borrower_name`, `owner_name` via JOINs or in component
4. **Bookings**: Add `item_title`, `borrower_name` via JOINs through rental_requests or in component

The table components handle both scenarios:
- If you JOIN in SQL → fields are already flat
- If you get nested objects → components flatten them automatically
