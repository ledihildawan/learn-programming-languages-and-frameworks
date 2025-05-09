import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/types";

export default function TableOrder({ orders }: { orders: Order[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>order_id</TableHead>
          <TableHead>customer_id</TableHead>
          <TableHead>order_date</TableHead>
          <TableHead>status</TableHead>
          <TableHead>comments</TableHead>
          <TableHead>shipped_date</TableHead>
          <TableHead>shipper_id</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.orderId}>
            <TableCell>{order.orderId}</TableCell>
            <TableCell>{order.customerId}</TableCell>
            <TableCell>{order.orderDate}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>{order.comments}</TableCell>
            <TableCell>{order.shippedDate}</TableCell>
            <TableCell>{order.shipperId}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
