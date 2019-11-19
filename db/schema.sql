-- Extensions

create extension if not exists "uuid-ossp";

-- Schemas

create schema if not exists "public";

-- Tables

create table "public"."stats" (
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
