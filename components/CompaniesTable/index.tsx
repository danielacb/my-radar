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

import { columns, TableChip, TableDropdown, TableEmptyState } from "./elements";

import { Company } from "@/types";

interface CompaniesTableProps {
  companies?: Company[];
}

export const CompaniesTable = ({ companies }: CompaniesTableProps) => {
  const renderCell = useCallback((company: Company, columnKey: Key) => {
    const { careerPage, name, isJobFound, isKeywordFound, website } = company;

    switch (columnKey) {
      case "name":
        return name;
      case "isKeywordFound":
        return <TableChip isFound={isKeywordFound} />;
      case "isJobFound":
        return <TableChip isFound={isJobFound} />;
      case "_id":
        return <TableDropdown careerPage={careerPage} website={website} />;
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
                <Spinner />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
