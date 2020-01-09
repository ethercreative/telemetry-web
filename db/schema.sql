-- Extensions

create extension if not exists "uuid-ossp";

-- Schemas

create schema if not exists "public";

-- Tables

create table if not exists "public"."plugins" (
    "id" uuid primary key default (public.uuid_generate_v4()),
    "handle" text not null,
    "name" text not null,
    "developer" text not null,
    "icon" text not null
);

create table if not exists "public"."stats" (
    "id" uuid primary key default (public.uuid_generate_v4()),
    "key" uuid not null,
    "handle" text not null,
    "version" text not null,
    "edition" text not null,
    "editions" text[] not null,
    "installed" boolean not null,
    "enabled" boolean not null,
    "license" text not null,
    "issues" text,
    "env" text not null,
    "php" text not null
);

alter table "public"."stats" add column "createdAt" timestamptz not null default (now());
alter table "public"."stats" alter column "key" type text;
alter table "public"."stats" alter column "license" drop not null;
