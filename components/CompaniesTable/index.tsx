import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Spinner } from "@nextui-org/spinner";
import { Key, useCallback } from "react";

import { columns, TableChip, TableEmptyState } from "./elements";
import { TableDropdown } from "./TableDropdown";
import { TableNameCell } from "./TableNameCell";

import { Company } from "@/types";

interface CompaniesTableProps {
  companies?: Company[];
}

export const CompaniesTable = ({ companies }: CompaniesTableProps) => {
  const renderCell = useCallback((company: Company, columnKey: Key) => {
    const { isJobFound, isScanningJob, isKeywordFound, isScanningKeyword } =
      company;

    switch (columnKey) {
      case "name":
        return <TableNameCell company={company} />;
      case "isKeywordFound":
        return (
          <TableChip isFound={isKeywordFound} isLoading={isScanningKeyword} />
        );
      case "isJobFound":
        return <TableChip isFound={isJobFound} isLoading={isScanningJob} />;
      case "_id":
        return <TableDropdown company={company} />;
      default:
        return "-";
    }
  }, []);

  if (companies) {
    return (
      <Table aria-label="Companies table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.align}
              className="uppercase"
              width={column.width}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={<TableEmptyState />} items={companies}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }

  return (
    <Table hideHeader aria-label="Example static collection table">
      <TableHeader columns={[]}>
        <TableColumn>Company</TableColumn>
      </TableHeader>
      <TableBody items={[{}]}>
        {() => (
          <TableRow key="id">
            {() => (
              <TableCell className="text-center" colSpan={2}>
                <Spinner color="success" />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
