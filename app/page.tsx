"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";

import { VerticalDotsIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>COMPANY</TableColumn>
          <TableColumn>KEYWORD</TableColumn>
          <TableColumn>JOB OPENING</TableColumn>
          <TableColumn align="end" width={100}>
            ACTIONS
          </TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Tony Reichert</TableCell>
            <TableCell>
              <Chip
                className="capitalize border-none gap-1 text-default-600"
                color="success"
                size="sm"
                variant="dot"
              >
                Found
              </Chip>
            </TableCell>
            <TableCell>
              <Chip
                className="capitalize border-none gap-1 text-default-600"
                color="success"
                size="sm"
                variant="dot"
              >
                Found
              </Chip>
            </TableCell>
            <TableCell>
              <div className="relative flex justify-end items-center gap-2">
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                      <VerticalDotsIcon className="text-default-300" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem>View</DropdownItem>
                    <DropdownItem>Edit</DropdownItem>
                    <DropdownItem>Delete</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Zoey Lang</TableCell>
            <TableCell>
              <Chip
                className="capitalize border-none gap-1 text-default-600"
                color="success"
                size="sm"
                variant="dot"
              >
                Found
              </Chip>
            </TableCell>
            <TableCell>
              <Chip
                className="capitalize border-none gap-1 text-default-600"
                color="danger"
                size="sm"
                variant="dot"
              >
                Not Found
              </Chip>
            </TableCell>
            <TableCell>
              <div className="relative flex justify-end items-center gap-2">
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                      <VerticalDotsIcon className="text-default-300" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem>View</DropdownItem>
                    <DropdownItem>Edit</DropdownItem>
                    <DropdownItem>Delete</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Jane Fisher</TableCell>
            <TableCell>
              <Chip
                className="capitalize border-none gap-1 text-default-600"
                color="success"
                size="sm"
                variant="dot"
              >
                Found
              </Chip>
            </TableCell>
            <TableCell>
              <Chip
                className="capitalize border-none gap-1 text-default-600"
                color="danger"
                size="sm"
                variant="dot"
              >
                Not Found
              </Chip>
            </TableCell>
            <TableCell>
              <div className="relative flex justify-end items-center gap-2">
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                      <VerticalDotsIcon className="text-default-300" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem>View</DropdownItem>
                    <DropdownItem>Edit</DropdownItem>
                    <DropdownItem>Delete</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>William Howard</TableCell>
            <TableCell>
              <Chip
                className="capitalize border-none gap-1 text-default-600"
                color="success"
                size="sm"
                variant="dot"
              >
                Found
              </Chip>
            </TableCell>
            <TableCell>
              <Chip
                className="capitalize border-none gap-1 text-default-600"
                color="danger"
                size="sm"
                variant="dot"
              >
                Not Found
              </Chip>
            </TableCell>
            <TableCell>
              <div className="relative flex justify-end items-center gap-2">
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                      <VerticalDotsIcon className="text-default-300" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem>View</DropdownItem>
                    <DropdownItem>Edit</DropdownItem>
                    <DropdownItem>Delete</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
}
