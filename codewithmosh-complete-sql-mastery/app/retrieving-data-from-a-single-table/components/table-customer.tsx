import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Customer } from "@/types";

export default function TableCustomer({
  customers,
}: {
  customers: Customer[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>customer_id</TableHead>
          <TableHead>first_name</TableHead>
          <TableHead>last_name</TableHead>
          <TableHead>birthdate</TableHead>
          <TableHead>phone</TableHead>
          <TableHead>address</TableHead>
          <TableHead>city</TableHead>
          <TableHead>state</TableHead>
          <TableHead>points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.customerId}>
            <TableCell>{customer.customerId}</TableCell>
            <TableCell>{customer.firstName}</TableCell>
            <TableCell>{customer.lastName}</TableCell>
            <TableCell>{customer.birthDate}</TableCell>
            <TableCell>{customer.phone}</TableCell>
            <TableCell>{customer.address}</TableCell>
            <TableCell>{customer.city}</TableCell>
            <TableCell>{customer.state}</TableCell>
            <TableCell>{customer.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
