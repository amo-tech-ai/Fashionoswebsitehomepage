# Supabase Backend Rules

## Schema Patterns

### Table Structure
```sql
CREATE TABLE table_name (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  
  -- Data columns
  name text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'draft',
  
  -- Timestamps
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);
```

### Indexes
```sql
CREATE INDEX idx_table_organization ON table_name(organization_id);
CREATE INDEX idx_table_created_by ON table_name(created_by);
CREATE INDEX idx_table_status ON table_name(status);
```

### RLS Policies
```sql
-- Enable RLS
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

-- Select: Org members can view
CREATE POLICY "Org members can view"
ON table_name FOR SELECT
TO authenticated
USING (
  organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  )
);

-- Insert: Org members can create
CREATE POLICY "Org members can create"
ON table_name FOR INSERT
TO authenticated
WITH CHECK (
  organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  )
);

-- Update: Org members can edit
CREATE POLICY "Org members can update"
ON table_name FOR UPDATE
TO authenticated
USING (
  organization_id IN (
    SELECT organization_id FROM users WHERE id = auth.uid()
  )
);

-- Delete: Owners/admins only
CREATE POLICY "Owners can delete"
ON table_name FOR DELETE
TO authenticated
USING (
  organization_id IN (
    SELECT organization_id FROM users 
    WHERE id = auth.uid() AND role IN ('owner', 'admin')
  )
);
```

### Triggers
```sql
-- Auto-update updated_at
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON table_name
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
```

## Query Patterns

### Basic CRUD
```typescript
// Create
const { data, error } = await supabase
  .from('table_name')
  .insert({ name: 'Value' })
  .select()
  .single();

// Read
const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('id', id)
  .single();

// Update
const { data, error } = await supabase
  .from('table_name')
  .update({ name: 'New Value' })
  .eq('id', id)
  .select()
  .single();

// Delete
const { error } = await supabase
  .from('table_name')
  .delete()
  .eq('id', id);
```

### Joins
```typescript
const { data } = await supabase
  .from('events')
  .select(`
    *,
    organization:organizations(name, slug),
    creator:users!events_created_by_fkey(full_name, email),
    tasks(id, title, status)
  `);
```

### Real-Time Subscriptions
```typescript
const subscription = supabase
  .channel('table-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'table_name'
    },
    (payload) => {
      console.log('Change:', payload);
    }
  )
  .subscribe();
```

## Storage Patterns

### Upload File
```typescript
const { data, error } = await supabase.storage
  .from('bucket-name')
  .upload(`${folderId}/${fileName}`, file, {
    cacheControl: '3600',
    upsert: false
  });
```

### Get Public URL
```typescript
const { data } = supabase.storage
  .from('bucket-name')
  .getPublicUrl(filePath);
```

### Delete File
```typescript
const { error } = await supabase.storage
  .from('bucket-name')
  .remove([filePath]);
```

## Error Handling

### Pattern
```typescript
async function queryData() {
  try {
    const { data, error } = await supabase
      .from('table')
      .select('*');
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (err: any) {
    console.error('Query error:', err);
    return { data: null, error: err.message };
  }
}
```

## Multi-Tenant Isolation

### Always Filter by Organization
```typescript
// ✅ Correct
const { data } = await supabase
  .from('events')
  .select('*')
  .eq('organization_id', orgId);

// ❌ Wrong (exposes all orgs)
const { data } = await supabase
  .from('events')
  .select('*');
```
