import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const transactions = [
  { id: 1, stock: "AAPL", type: "Buy", amount: 10, price: 150.25, date: "2023-06-01" },
  { id: 2, stock: "GOOGL", type: "Sell", amount: 5, price: 2500.75, date: "2023-06-02" },
  { id: 3, stock: "MSFT", type: "Buy", amount: 15, price: 300.50, date: "2023-06-03" },
  { id: 4, stock: "AMZN", type: "Buy", amount: 8, price: 3200.00, date: "2023-06-04" },
  { id: 5, stock: "TSLA", type: "Sell", amount: 12, price: 650.75, date: "2023-06-05" },
]

export default function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stock</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.stock}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>${transaction.price.toFixed(2)}</TableCell>
                <TableCell>{transaction.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

