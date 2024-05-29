<script setup lang="ts" generic="TData, TValue">
import type {
  ColumnDef,
  PaginationState,
  SortingState,
} from "@tanstack/vue-table";
import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import { valueUpdater } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTablePagination from "./DataTablePagination.vue";

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: Partial<PaginationState>;
}>();

const sorting = ref<SortingState>([]);

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  state: {
    get sorting() {
      return sorting.value;
    },
  },
  initialState: {
    pagination: props.pagination,
  },
  defaultColumn: {
    enableSorting: false,
  },
});
</script>

<template>
  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead
            v-for="header in headerGroup.headers"
            :key="header.id"
            :column="header.column"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :col-span="columns.length" class="h-24 text-center">
              No data
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
    <DataTablePagination v-if="pagination" :table="table" />
  </div>
</template>
