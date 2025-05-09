import { BuildExtraConfigColumns } from "drizzle-orm";
import { PgColumnBuilderBase, pgSchema, PgTableExtraConfigValue } from "drizzle-orm/pg-core";

export function defineTable<
  TSchema extends string,
  TTableName extends string,
  TColumnsMap extends Record<string, PgColumnBuilderBase>,
>({
  name,
  schema,
  columns,
  extraConfig,
}: {
  name: TTableName;
  schema?: TSchema;
  columns: TColumnsMap;
  extraConfig?: (self: BuildExtraConfigColumns<TTableName, TColumnsMap, "pg">) => PgTableExtraConfigValue[];
}) {
  return pgSchema(schema || "public").table(name, columns, extraConfig);
}
