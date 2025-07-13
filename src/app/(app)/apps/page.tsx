

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const apps = [
  { name: 'Analytics Pro', version: '1.2.3', status: 'Active', installDate: '2023-10-01' },
  { name: 'CRM Connect', version: '2.0.1', status: 'Active', installDate: '2023-09-15' },
  { name: 'Support Suite', version: '3.5.0', status: 'Inactive', installDate: '2023-08-22' },
  { name: 'Marketing Automator', version: '1.8.2', status: 'Active', installDate: '2023-11-05' },
];

export default function AppsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">App Management</h1>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Install New App
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Installed Applications</CardTitle>
          <CardDescription>Manage your installed applications and their configurations.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Install Date</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apps.map((app) => (
                <TableRow key={app.name}>
                  <TableCell className="font-medium">{app.name}</TableCell>
                  <TableCell>{app.version}</TableCell>
                  <TableCell>
                    <Badge variant={app.status === 'Active' ? 'default' : 'secondary'}>
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{app.installDate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Configure</DropdownMenuItem>
                        <DropdownMenuItem>Update</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Uninstall</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
