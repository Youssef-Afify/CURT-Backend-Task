export interface QueryModel {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
}

export function parseQueryModel(query: Record<string, unknown>): QueryModel {
  return {
    page: query.page ? Number(query.page) : 1,
    pageSize: query.pageSize ? Number(query.pageSize) : 20,
    sortBy: typeof query.sortBy === "string" ? query.sortBy : undefined,
    sortDir: query.sortDir === "desc" ? "desc" : "asc",
  };
}
