# Table Search Configuration - Summary

## What Changed

### 1. **table-configs.tsx** - Column Definitions Updated
All searchable columns now use `accessorFn` to properly extract nested data:

- **Users Table**: `id: "name"` - Searches name, last name, and email
- **Items Table**: `id: "title"` - Searches title and description
- **Requests Table**: 
  - `id: "item"` - Searches item names
  - `id: "borrower"` - Searches borrower full names
  - `id: "owner"` - Searches owner full names
- **Bookings Table**: 
  - `id: "item"` - Searches item names
  - `id: "borrower"` - Searches borrower full names
- **Merchants Table**: `id: "business_name"` - Searches business name, owner name, and email

### 2. **Table Components** - Optimal Search Keys

#### UsersTable
```typescript
searchKey="name"
searchPlaceholder="Search by name or email..."
```
**What you can search for**: First names, last names, email addresses

#### ItemsTable
```typescript
searchKey="title"
searchPlaceholder="Search by title or description..."
```
**What you can search for**: Item titles, item descriptions

#### RequestsTable
```typescript
searchKey="borrower"
searchPlaceholder="Search by borrower name..."
```
**What you can search for**: Borrower first names, borrower last names
**Alternative**: Change to `searchKey="item"` to search by item names instead

#### BookingsTable
```typescript
searchKey="borrower"
searchPlaceholder="Search by borrower name..."
```
**What you can search for**: Borrower first names, borrower last names
**Alternative**: Change to `searchKey="item"` to search by item names instead

#### MerchantsTable
```typescript
searchKey="business_name"
searchPlaceholder="Search by business name or owner..."
```
**What you can search for**: Business names, owner first names, owner last names, owner emails

## How It Works

### Before (❌ BROKEN)
```typescript
{
  accessorKey: "items", // This returns an object!
  header: "Item",
  cell: ({ row }) => <span>{row.original.items?.title}</span>
}
// Search was trying to filter on [object Object] ❌
```

### After (✅ WORKING)
```typescript
{
  id: "item",
  accessorFn: (row) => row.items?.title || "Unknown Item", // Extracts the string!
  header: "Item",
  cell: ({ row }) => <span>{row.original.items?.title}</span>
}
// Search filters on actual item titles ✅
```

## Quick Reference

| Table | Search Key | Searches |
|-------|-----------|----------|
| Users | `name` | First name, last name, email |
| Items | `title` | Title, description |
| Requests | `borrower` | Borrower name (can change to `item`) |
| Bookings | `borrower` | Borrower name (can change to `item`) |
| Merchants | `business_name` | Business name, owner info |

## Next Steps

1. Replace your `lib/table-configs.tsx` with the updated version
2. Replace your table component files with the optimized versions
3. Test the search functionality - it should now work properly!

## Optional: Switch Search Fields

If you want to search by item name instead of borrower for requests/bookings:

```typescript
// In requests-table.tsx or bookings-table.tsx
searchKey="item"
searchPlaceholder="Search by item name..."
```

Both options are now available because we added `accessorFn` to both columns!
