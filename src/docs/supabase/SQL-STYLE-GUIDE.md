# Postgres SQL Style Guide — FashionOS
## Code Formatting Standards for Database Development

**Last Updated:** December 20, 2024  
**Status:** Production Standards  
**Applies To:** All SQL code in FashionOS database

---

## 📋 TABLE OF CONTENTS

1. [General Principles](#1-general-principles)
2. [Naming Conventions](#2-naming-conventions)
3. [Tables](#3-tables)
4. [Columns](#4-columns)
5. [Queries](#5-queries)
6. [Joins and Subqueries](#6-joins-and-subqueries)
7. [Aliases](#7-aliases)
8. [Complex Queries and CTEs](#8-complex-queries-and-ctes)
9. [Functions and Triggers](#9-functions-and-triggers)
10. [Indexes](#10-indexes)
11. [Constraints](#11-constraints)
12. [Comments and Documentation](#12-comments-and-documentation)

---

## 1. General Principles

### 1.1 **Case Sensitivity**

- ✅ Use **lowercase** for SQL reserved words to maintain consistency and readability
- ✅ Use **lowercase** for all identifiers (tables, columns, functions)

```sql
-- ✅ CORRECT
select * from users where status = 'active';

-- ❌ WRONG
SELECT * FROM Users WHERE Status = 'Active';
```

### 1.2 **Whitespace and Indentation**

- Use white space and indentation to enhance the readability of your code
- Use **2 spaces** for indentation (not tabs)
- Add blank lines between logical sections

```sql
-- ✅ CORRECT
select
  id,
  name,
  email
from
  users
where
  created_at > '2024-01-01'
and
  status = 'active';

-- ❌ WRONG
select id,name,email from users where created_at>'2024-01-01' and status='active';
```

### 1.3 **Date and Time Formats**

- Store dates in **ISO 8601** format: `yyyy-mm-ddThh:mm:ss.sssss`
- Always use `timestamptz` (timestamp with time zone) for date/time columns

```sql
-- ✅ CORRECT
create table events (
  id uuid primary key default uuid_generate_v4(),
  start_date timestamptz not null,
  created_at timestamptz not null default now()
);

-- ❌ WRONG
create table events (
  id uuid primary key default uuid_generate_v4(),
  start_date timestamp not null,  -- Missing timezone
  created_at date not null         -- No time component
);
```

### 1.4 **Comments**

- Use `/* ... */` for **block comments**
- Use `--` for **line comments**
- Include comments for complex logic

```sql
/*
 * This function calculates the total event budget
 * including all budget items and sponsor contributions
 */
create or replace function calculate_event_total_budget(event_uuid uuid)
returns numeric as $$
begin
  -- Sum all budget items
  return (
    select sum(budgeted_amount)
    from budget_items
    where event_id = event_uuid
  );
end;
$$ language plpgsql;
```

---

## 2. Naming Conventions

### 2.1 **General Rules**

- ✅ Avoid SQL reserved words (`user`, `order`, `group`, etc.)
- ✅ Ensure names are **unique** and **under 63 characters**
- ✅ Use **snake_case** for all identifiers
- ✅ Use descriptive, meaningful names

```sql
-- ✅ CORRECT
create table event_sponsors (
  id uuid primary key,
  event_id uuid references events(id),
  sponsor_organization_id uuid references sponsor_organizations(id)
);

-- ❌ WRONG
create table EventSponsors (        -- ❌ PascalCase
  ID uuid primary key,               -- ❌ Uppercase
  eventId uuid,                      -- ❌ camelCase
  sponsorOrgID uuid                  -- ❌ Mixed case
);
```

### 2.2 **Table Names**

- ✅ Prefer **plurals** for table names
- ✅ Use descriptive, domain-specific names
- ❌ Avoid prefixes like `tbl_`
- ❌ Ensure no table name matches any of its column names

```sql
-- ✅ CORRECT
create table users (...);
create table events (...);
create table event_models (...);
create table budget_items (...);

-- ❌ WRONG
create table tbl_user (...);        -- ❌ Prefix + singular
create table User (...);            -- ❌ Uppercase + singular
create table event (...);           -- ❌ Singular
```

### 2.3 **Column Names**

- ✅ Use **singular** names
- ❌ Avoid generic names like `id` for non-primary-key columns
- ✅ For foreign keys, use: `{singular_table_name}_id`
- ✅ Always use lowercase except for acronyms where readability is enhanced

```sql
-- ✅ CORRECT
create table events (
  id uuid primary key,
  organization_id uuid references organizations(id),
  created_by uuid references users(id),
  name text not null,
  status text not null,
  start_date timestamptz not null
);

-- ❌ WRONG
create table events (
  ID uuid primary key,               -- ❌ Uppercase
  org_id uuid,                       -- ❌ Abbreviated
  createdBy uuid,                    -- ❌ camelCase
  EventName text,                    -- ❌ PascalCase
  event_status text,                 -- ❌ Redundant prefix
  StartDate timestamptz              -- ❌ PascalCase
);
```

### 2.4 **Boolean Columns**

- ✅ Prefix with `is_`, `has_`, `can_`, or `should_`

```sql
-- ✅ CORRECT
create table tasks (
  id uuid primary key,
  is_critical_path boolean not null default false,
  is_completed boolean not null default false,
  has_dependencies boolean not null default false
);

-- ❌ WRONG
create table tasks (
  id uuid primary key,
  critical_path boolean,             -- ❌ Not clear it's boolean
  completed boolean,                 -- ❌ Not clear it's boolean
  dependencies boolean               -- ❌ Confusing name
);
```

### 2.5 **Junction Tables**

- ✅ Use format: `{table1}_{table2}` or `{entity1}_{entity2}_junction`

```sql
-- ✅ CORRECT
create table event_models (...);
create table event_stakeholders (...);
create table organizer_team_members (...);

-- ❌ WRONG
create table events_to_models (...);       -- ❌ Verbose
create table event_model_mapping (...);    -- ❌ Redundant
create table em (...);                     -- ❌ Abbreviated
```

---

## 3. Tables

### 3.1 **Table Creation Standards**

- ✅ Always add an `id` column of type `uuid` with `uuid_generate_v4()`
- ✅ Create all tables in the `public` schema unless otherwise specified
- ✅ Always add the schema to SQL queries for clarity
- ✅ Always add a comment to describe what the table does (max 1024 characters)
- ❌ Avoid prefixes like `tbl_`
- ❌ Ensure no table name matches any of its column names

```sql
-- ✅ CORRECT
create table public.events (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  status text not null default 'planning',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.events is 'Core event data for fashion shows, photoshoots, and brand activations. Each event belongs to an organization and tracks budget, attendees, and production workflow.';

-- ❌ WRONG
create table events (               -- ❌ Missing schema
  event_id serial primary key,      -- ❌ serial instead of uuid
  org_id int references orgs(id),   -- ❌ Abbreviated names
  name varchar(255)                 -- ❌ varchar instead of text
);
-- ❌ Missing comment
```

### 3.2 **Table Organization**

**Column Order:**
1. Primary key (`id`)
2. Foreign keys (organization, user references)
3. Core data columns
4. Status/state columns
5. Metadata columns (`created_at`, `updated_at`, `deleted_at`)

```sql
-- ✅ CORRECT
create table public.tasks (
  -- Primary key
  id uuid primary key default uuid_generate_v4(),
  
  -- Foreign keys
  event_id uuid not null references public.events(id) on delete cascade,
  assigned_to uuid references public.users(id) on delete set null,
  
  -- Core data
  title text not null,
  description text,
  deadline timestamptz,
  
  -- Status
  status text not null default 'to_do',
  priority text not null default 'medium',
  is_critical_path boolean not null default false,
  
  -- Metadata
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.tasks is 'Event task management with workflow tracking, assignments, and critical path analysis.';
```

---

## 4. Columns

### 4.1 **Column Definition Standards**

- ✅ Use **singular** names
- ✅ Use **text** instead of `varchar` (Postgres optimizes automatically)
- ✅ Use **numeric(precision, scale)** for currency
- ✅ Use **timestamptz** for timestamps
- ✅ Use **uuid** for primary and foreign keys
- ✅ Always specify `not null` or allow nulls explicitly

```sql
-- ✅ CORRECT
create table public.budget_items (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid not null references public.events(id) on delete cascade,
  category text not null,
  item_name text not null,
  budgeted_amount numeric(12,2) not null check (budgeted_amount >= 0),
  actual_amount numeric(12,2) not null default 0,
  vendor text,                    -- Explicitly nullable
  created_at timestamptz not null default now()
);

-- ❌ WRONG
create table budget_items (
  id serial primary key,                     -- ❌ serial instead of uuid
  event_id int references events(id),        -- ❌ int instead of uuid
  category varchar(100),                     -- ❌ varchar instead of text
  name varchar(255),                         -- ❌ Missing 'item_' prefix
  budgeted money,                            -- ❌ money type (deprecated)
  actual decimal,                            -- ❌ decimal without precision
  created_at timestamp default now()         -- ❌ timestamp without timezone
);
```

### 4.2 **Foreign Key Naming**

- ✅ Format: `{singular_table_name}_id`
- ✅ Always add `on delete` clause
- ✅ Use appropriate delete actions: `cascade`, `set null`, `restrict`

```sql
-- ✅ CORRECT
create table public.event_models (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid not null references public.events(id) on delete cascade,
  model_profile_id uuid not null references public.model_profiles(id) on delete cascade,
  walk_order integer,
  created_at timestamptz not null default now()
);

-- ❌ WRONG
create table event_models (
  id uuid primary key,
  event uuid references events(id),          -- ❌ Missing _id suffix
  model_id uuid references models(id),       -- ❌ No on delete clause
  order integer                              -- ❌ 'order' is reserved word
);
```

---

## 5. Queries

### 5.1 **Query Formatting**

- ✅ Keep **shorter queries** on just a few lines
- ✅ Add **newlines** for larger queries
- ✅ Add **spaces** for readability
- ✅ Align related clauses

**Smaller Queries:**

```sql
-- ✅ Simple SELECT
select * from public.employees where end_date is null;

-- ✅ Simple UPDATE
update public.employees
set end_date = '2023-12-31'
where employee_id = 1001;

-- ✅ Simple DELETE
delete from public.tasks where status = 'cancelled';
```

**Larger Queries:**

```sql
-- ✅ Multi-line SELECT
select
  first_name,
  last_name,
  email
from
  public.employees
where
  start_date between '2021-01-01' and '2021-12-31'
and
  status = 'employed'
order by
  last_name,
  first_name;

-- ✅ Complex UPDATE
update public.events
set
  status = 'completed',
  progress_percentage = 100,
  updated_at = now()
where
  end_date < now()
and
  status = 'active';
```

### 5.2 **WHERE Clause Formatting**

```sql
-- ✅ CORRECT: Each condition on new line
select
  id,
  name,
  status
from
  public.events
where
  organization_id = 'uuid-here'
and
  status in ('planning', 'active')
and
  start_date > now()
order by
  start_date asc;

-- ❌ WRONG: All on one line
select id, name, status from events where organization_id = 'uuid-here' and status in ('planning', 'active') and start_date > now() order by start_date;
```

---

## 6. Joins and Subqueries

### 6.1 **Join Formatting**

- ✅ Format joins for clarity, aligning them with related SQL clauses
- ✅ Prefer **full table names** when referencing tables
- ✅ Use **explicit join types** (`inner join`, `left join`, `right join`)
- ❌ Avoid implicit joins (comma syntax)

```sql
-- ✅ CORRECT: Explicit joins with full table names
select
  employees.employee_name,
  departments.department_name,
  organizations.name as organization_name
from
  public.employees
inner join
  public.departments on employees.department_id = departments.id
inner join
  public.organizations on departments.organization_id = organizations.id
where
  employees.start_date > '2022-01-01'
order by
  employees.employee_name;

-- ❌ WRONG: Implicit join
select
  e.employee_name,
  d.department_name
from
  employees e, departments d
where
  e.department_id = d.id;
```

### 6.2 **Left Joins for Optional Data**

```sql
-- ✅ CORRECT: Left join for optional relationships
select
  events.id,
  events.name,
  count(tasks.id) as task_count,
  count(sponsors.id) as sponsor_count
from
  public.events
left join
  public.tasks on tasks.event_id = events.id
left join
  public.sponsors on sponsors.event_id = events.id
where
  events.organization_id = 'uuid-here'
group by
  events.id,
  events.name
order by
  events.start_date desc;
```

### 6.3 **Subquery Formatting**

```sql
-- ✅ CORRECT: Indented subquery
select
  id,
  name,
  (
    select count(*)
    from public.tasks
    where tasks.event_id = events.id
      and tasks.status = 'done'
  ) as completed_task_count
from
  public.events
where
  status = 'active';

-- ✅ CORRECT: Subquery in WHERE clause
select
  id,
  name,
  budget_total
from
  public.events
where
  id in (
    select event_id
    from public.sponsors
    where tier = 'platinum'
  );
```

---

## 7. Aliases

### 7.1 **Alias Standards**

- ✅ Use **meaningful aliases** that reflect the data or transformation
- ✅ Always include the **`as` keyword** for clarity
- ❌ Avoid single-letter aliases except for very short queries

```sql
-- ✅ CORRECT: Descriptive aliases
select
  count(*) as total_employees,
  avg(salary) as average_salary,
  max(salary) as highest_salary
from
  public.employees
where
  end_date is null;

-- ✅ CORRECT: Table aliases for clarity
select
  e.name as event_name,
  o.name as organization_name,
  u.full_name as organizer_name
from
  public.events as e
inner join
  public.organizations as o on e.organization_id = o.id
inner join
  public.users as u on e.created_by = u.id;

-- ❌ WRONG: Unclear aliases
select
  count(*) as c,              -- ❌ Single letter
  avg(salary) as a,           -- ❌ Meaningless
  max(salary) as m            -- ❌ Unclear
from
  employees;
```

### 7.2 **When to Use Aliases**

**✅ Use aliases for:**
- Aggregate functions
- Calculated fields
- Joined tables with long names
- Disambiguating column names

**❌ Don't use aliases for:**
- Single-table queries with simple selects
- When column names are already clear

```sql
-- ✅ Good: Aliases improve clarity
select
  budget_total - budget_actual as budget_remaining,
  (budget_actual / budget_total * 100) as budget_used_percentage
from
  public.events
where
  status = 'active';

-- ✅ Good: No aliases needed
select
  id,
  name,
  status
from
  public.events
where
  status = 'active';
```

---

## 8. Complex Queries and CTEs

### 8.1 **When to Use CTEs**

- ✅ If a query is extremely complex, prefer a **CTE (Common Table Expression)**
- ✅ Make sure the CTE is **clear and linear**
- ✅ Prefer **readability over performance**
- ✅ Add **comments to each block**

```sql
-- ✅ CORRECT: Well-structured CTE
with department_employees as (
  -- Get all employees and their departments
  select
    employees.department_id,
    employees.first_name,
    employees.last_name,
    departments.department_name
  from
    public.employees
  inner join
    public.departments on employees.department_id = departments.id
),
employee_counts as (
  -- Count how many employees in each department
  select
    department_name,
    count(*) as num_employees
  from
    department_employees
  group by
    department_name
)
select
  department_name,
  num_employees
from
  employee_counts
order by
  num_employees desc,
  department_name;
```

### 8.2 **Multiple CTEs**

```sql
-- ✅ CORRECT: Multiple CTEs for complex logic
with active_events as (
  -- Get all active events
  select
    id,
    organization_id,
    name,
    budget_total,
    start_date
  from
    public.events
  where
    status = 'active'
),
event_tasks as (
  -- Get task counts per event
  select
    event_id,
    count(*) as total_tasks,
    count(*) filter (where status = 'done') as completed_tasks
  from
    public.tasks
  group by
    event_id
),
event_sponsors as (
  -- Get sponsor value per event
  select
    event_id,
    count(*) as sponsor_count,
    sum(value) as total_sponsor_value
  from
    public.sponsors
  where
    status in ('committed', 'confirmed')
  group by
    event_id
)
select
  ae.id,
  ae.name,
  ae.budget_total,
  ae.start_date,
  coalesce(et.total_tasks, 0) as total_tasks,
  coalesce(et.completed_tasks, 0) as completed_tasks,
  coalesce(es.sponsor_count, 0) as sponsor_count,
  coalesce(es.total_sponsor_value, 0) as sponsor_value
from
  active_events as ae
left join
  event_tasks as et on et.event_id = ae.id
left join
  event_sponsors as es on es.event_id = ae.id
order by
  ae.start_date desc;
```

### 8.3 **Recursive CTEs**

```sql
-- ✅ CORRECT: Recursive CTE for task dependencies
with recursive task_hierarchy as (
  -- Base case: tasks with no dependencies
  select
    id,
    title,
    event_id,
    dependency_task_ids,
    0 as depth
  from
    public.tasks
  where
    dependency_task_ids = array[]::uuid[]
  
  union all
  
  -- Recursive case: tasks that depend on previous level
  select
    t.id,
    t.title,
    t.event_id,
    t.dependency_task_ids,
    th.depth + 1
  from
    public.tasks as t
  inner join
    task_hierarchy as th on th.id = any(t.dependency_task_ids)
)
select
  id,
  title,
  depth,
  repeat('  ', depth) || title as indented_title
from
  task_hierarchy
order by
  depth,
  title;
```

---

## 9. Functions and Triggers

### 9.1 **Function Standards**

- ✅ Use **snake_case** for function names
- ✅ Include **descriptive comments**
- ✅ Specify **return type** explicitly
- ✅ Use **security definer** when needed for RLS

```sql
-- ✅ CORRECT: Well-documented function
/*
 * Calculate the total budget for an event
 * including all budget items and sponsor contributions
 *
 * @param event_uuid - The UUID of the event
 * @returns The total budget as numeric(12,2)
 */
create or replace function public.calculate_event_total_budget(event_uuid uuid)
returns numeric(12,2) as $$
declare
  budget_sum numeric(12,2);
  sponsor_sum numeric(12,2);
begin
  -- Sum all budget items
  select coalesce(sum(budgeted_amount), 0)
  into budget_sum
  from public.budget_items
  where event_id = event_uuid;
  
  -- Sum all confirmed sponsors
  select coalesce(sum(value), 0)
  into sponsor_sum
  from public.sponsors
  where event_id = event_uuid
    and status in ('committed', 'confirmed');
  
  return budget_sum + sponsor_sum;
end;
$$ language plpgsql stable;

comment on function public.calculate_event_total_budget(uuid) is 'Calculates total event budget including budget items and confirmed sponsor contributions';
```

### 9.2 **Trigger Functions**

```sql
-- ✅ CORRECT: Reusable trigger function
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

comment on function public.update_updated_at_column() is 'Automatically updates the updated_at timestamp on row modification';

-- Apply to tables
create trigger update_events_updated_at
  before update on public.events
  for each row
  execute function public.update_updated_at_column();

create trigger update_tasks_updated_at
  before update on public.tasks
  for each row
  execute function public.update_updated_at_column();
```

---

## 10. Indexes

### 10.1 **Index Naming Convention**

- ✅ Format: `idx_{table}_{column(s)}`
- ✅ Use descriptive names that indicate purpose

```sql
-- ✅ CORRECT: Clear index names
create index idx_events_organization_id on public.events(organization_id);
create index idx_events_status on public.events(status);
create index idx_events_start_date on public.events(start_date desc);
create index idx_events_org_status on public.events(organization_id, status);

-- Partial index
create index idx_tasks_critical_path on public.tasks(is_critical_path)
where is_critical_path = true;

-- Full-text search index
create index idx_events_search on public.events
using gin(to_tsvector('english', name || ' ' || coalesce(description, '')));

-- ❌ WRONG: Unclear names
create index events_idx1 on events(organization_id);    -- ❌ No context
create index idx1 on events(status);                    -- ❌ Meaningless
create index org_id_idx on events(organization_id);     -- ❌ Inconsistent format
```

---

## 11. Constraints

### 11.1 **Constraint Naming**

- ✅ Format: `{table}_{column}_{type}`
- ✅ Types: `pk` (primary key), `fk` (foreign key), `uk` (unique), `ck` (check)

```sql
-- ✅ CORRECT: Named constraints
create table public.events (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null,
  name text not null,
  status text not null,
  progress_percentage integer not null default 0,
  budget_total numeric(12,2) not null default 0,
  budget_actual numeric(12,2) not null default 0,
  start_date timestamptz not null,
  end_date timestamptz,
  
  -- Foreign key constraint
  constraint events_organization_id_fk
    foreign key (organization_id)
    references public.organizations(id)
    on delete cascade,
  
  -- Check constraints
  constraint events_status_ck
    check (status in ('planning', 'active', 'completed', 'cancelled')),
  
  constraint events_progress_percentage_ck
    check (progress_percentage >= 0 and progress_percentage <= 100),
  
  constraint events_budget_ck
    check (budget_total >= 0 and budget_actual >= 0),
  
  constraint events_date_range_ck
    check (end_date is null or end_date >= start_date),
  
  -- Unique constraint
  constraint events_organization_name_uk
    unique (organization_id, name)
);
```

---

## 12. Comments and Documentation

### 12.1 **Table Comments**

- ✅ Every table must have a comment (max 1024 characters)
- ✅ Describe the table's purpose, key relationships, and use cases

```sql
comment on table public.events is 'Core event data for fashion shows, photoshoots, and brand activations. Each event belongs to an organization and tracks budget, attendees, and production workflow across multiple phases.';

comment on table public.tasks is 'Event task management with workflow tracking, assignments, and critical path analysis. Tasks are organized by workflow phase and category with dependency tracking.';

comment on table public.sponsors is 'Event sponsorship pipeline management tracking potential and confirmed sponsors with tier classifications, valuation, and fit scoring.';
```

### 12.2 **Column Comments**

- ✅ Add comments for complex or non-obvious columns

```sql
comment on column public.tasks.dependency_task_ids is 'Array of task IDs that must be completed before this task can start. Used for critical path analysis and workflow dependency tracking.';

comment on column public.assets.ai_score is 'AI-generated quality score from 0-100 based on composition, lighting, and brand alignment. Generated automatically on upload.';

comment on column public.events.progress_percentage is 'Overall event completion percentage (0-100) calculated from task completion, budget utilization, and phase status.';
```

### 12.3 **Function Comments**

```sql
comment on function public.calculate_event_total_budget(uuid) is 'Calculates total event budget including all budget items and confirmed sponsor contributions. Returns numeric(12,2) representing total budget in currency units.';

comment on function public.update_updated_at_column() is 'Trigger function that automatically updates the updated_at timestamp to the current time whenever a row is modified. Used across all tables with updated_at columns.';
```

---

## 📚 QUICK REFERENCE

### ✅ DO

```sql
-- Lowercase SQL keywords
select * from public.users;

-- Snake_case identifiers
create table event_models (...);

-- Plural table names
create table events (...);

-- Singular column names
create table events (
  id uuid primary key,
  organization_id uuid,
  name text not null
);

-- Explicit schema references
select * from public.events;

-- Table and column comments
comment on table events is 'Core event data...';

-- Named constraints
constraint events_status_ck check (status in ('planning', 'active'));

-- Descriptive aliases
select count(*) as total_events from public.events;

-- CTEs for complex queries
with active_events as (...)
select * from active_events;
```

### ❌ DON'T

```sql
-- Uppercase keywords
SELECT * FROM USERS;

-- PascalCase or camelCase
create table EventModels (...);

-- Singular table names
create table event (...);

-- Abbreviated names
create table evts (
  id uuid,
  org_id uuid,     -- Use organization_id
  nm text          -- Use name
);

-- Missing schema
select * from events;

-- Missing comments
create table events (...);
-- No comment!

-- Unnamed constraints
check (status in ('planning', 'active'));

-- Unclear aliases
select count(*) as c from events;

-- Nested subqueries instead of CTEs
select * from (
  select * from (...)
);
```

---

## 🔧 FORMATTING TOOLS

### SQL Formatter

Use online tools or IDE extensions to format SQL:
- **pgFormatter**: https://sqlformat.darold.net/
- **VS Code Extension**: PostgreSQL Formatter
- **JetBrains**: Built-in SQL formatter

### Example Configuration

```json
{
  "sql.format.keywordCase": "lower",
  "sql.format.identifierCase": "lower",
  "sql.format.indentSize": 2,
  "sql.format.lineWidth": 80
}
```

---

## 📖 EXAMPLES FROM FASHIONOS

### Complete Table Definition

```sql
-- Example: Full table with all best practices
create table public.event_models (
  -- Primary key
  id uuid primary key default uuid_generate_v4(),
  
  -- Foreign keys
  event_id uuid not null,
  model_profile_id uuid not null,
  
  -- Core data
  walk_order integer,
  is_opening boolean not null default false,
  is_closing boolean not null default false,
  
  -- Status
  fitting_status text not null default 'pending',
  
  -- Metadata
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  
  -- Constraints
  constraint event_models_event_id_fk
    foreign key (event_id)
    references public.events(id)
    on delete cascade,
  
  constraint event_models_model_profile_id_fk
    foreign key (model_profile_id)
    references public.model_profiles(id)
    on delete cascade,
  
  constraint event_models_fitting_status_ck
    check (fitting_status in ('pending', 'scheduled', 'completed')),
  
  constraint event_models_walk_order_ck
    check (walk_order > 0),
  
  constraint event_models_unique_walk_order_uk
    unique (event_id, walk_order)
);

-- Indexes
create index idx_event_models_event_id on public.event_models(event_id);
create index idx_event_models_model_profile_id on public.event_models(model_profile_id);
create index idx_event_models_walk_order on public.event_models(event_id, walk_order);

-- Comments
comment on table public.event_models is 'Models cast in runway shows with walk order, opening/closing status, and fitting tracking. Each model can appear in multiple events.';

comment on column public.event_models.walk_order is 'Order in which model appears on runway. Must be unique per event. Opening and closing models may have special walk orders.';

comment on column public.event_models.fitting_status is 'Tracks fitting appointment status to ensure all models are properly fitted before event day.';

-- Triggers
create trigger update_event_models_updated_at
  before update on public.event_models
  for each row
  execute function public.update_updated_at_column();
```

### Complex Query with CTE

```sql
-- Example: Dashboard query with multiple CTEs
with organization_events as (
  -- Get all events for the organization
  select
    id,
    name,
    status,
    budget_total,
    start_date
  from
    public.events
  where
    organization_id = 'uuid-here'
    and status in ('planning', 'active')
),
event_metrics as (
  -- Calculate metrics per event
  select
    oe.id,
    oe.name,
    count(distinct t.id) as total_tasks,
    count(distinct t.id) filter (where t.status = 'done') as completed_tasks,
    count(distinct s.id) as sponsor_count,
    coalesce(sum(s.value), 0) as sponsor_value
  from
    organization_events as oe
  left join
    public.tasks as t on t.event_id = oe.id
  left join
    public.sponsors as s on s.event_id = oe.id
      and s.status in ('committed', 'confirmed')
  group by
    oe.id,
    oe.name
),
event_progress as (
  -- Calculate completion percentage
  select
    em.id,
    em.name,
    em.total_tasks,
    em.completed_tasks,
    case
      when em.total_tasks > 0
      then round((em.completed_tasks::numeric / em.total_tasks) * 100)
      else 0
    end as completion_percentage,
    em.sponsor_count,
    em.sponsor_value
  from
    event_metrics as em
)
select
  oe.id,
  oe.name,
  oe.status,
  oe.budget_total,
  oe.start_date,
  ep.total_tasks,
  ep.completed_tasks,
  ep.completion_percentage,
  ep.sponsor_count,
  ep.sponsor_value
from
  organization_events as oe
inner join
  event_progress as ep on ep.id = oe.id
order by
  oe.start_date desc;
```

---

*Last Updated: December 20, 2024*  
*Version: 1.0*  
*Maintained by: FashionOS Engineering Team*
