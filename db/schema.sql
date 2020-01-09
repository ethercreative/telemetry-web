-- Extensions

create extension if not exists "uuid-ossp";

-- Schemas

create schema if not exists "public";

-- Tables

create table if not exists "public"."plugins" (
    "id" uuid primary key default (public.uuid_generate_v4()),
    "handle" text unique not null,
    "name" text not null,
    "developer" text not null,
    "developer_url" text not null,
    "icon" text not null,
    "editions" jsonb
);

create table if not exists "public"."stats" (
    "id" uuid primary key default (public.uuid_generate_v4()),
    "key" text not null,
    "handle" text not null,
    "version" text not null,
    "edition" text not null,
    "installed" boolean not null,
    "enabled" boolean not null,
    "license" text,
    "issues" text,
    "env" text not null,
    "php" text not null,
    "created_at" date not null default (now())
);

alter table "public"."stats" add unique (key, handle, created_at);

-- Functions

create or replace function public.stat_query (
  days int,
  date_from date default now()
) returns setof public.stats as $$
    select s.id, s.key, s.handle, s.version, s.edition, s.installed, s.enabled, s.license, s.issues, s.env, s.php, d::date as created_at
    from generate_series(date_from - days, date_from, '1 day'::interval) d
    left join public.stats as s on s.created_at <= d
$$ language sql;
