import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Link as MUILink, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";


interface Column {
  accessor: string;
  header: string;
  edit?: boolean;
  byId?: boolean;
  date?: boolean;
  data?: any
  key?: string
}

interface DataRow {
  [key: string]: string;
}

interface DataTableProps {
  columns: Column[];
  data: any;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data} ) => {

  // States for sorting and searching
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' }>({ key: '', direction: 'ascending' });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  
  //function to handle row render
  const renderColumn = (row: DataRow, column: Column): string => {
    if (column.byId && column.data && column.key) {
      const matchingObject = column.data.find((obj:any) => obj._id === row[column.accessor]);
      return matchingObject ? matchingObject[column.key] : '';
    }
    return row[column.accessor];
  };

  // Function to handle sorting
  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  // Function to handle search
  const filteredData = sortedData.filter(item => {
    return Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Function to request a sort
  const requestSort = (key:string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Render the table
  return (
    <Box>
      <TextField
        placeholder="Search..."
        onChange={(e) => setSearchQuery(e.target.value)}
        margin="normal"
        fullWidth
      />
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell
                key={column.accessor}
                onClick={() => requestSort(column.accessor)}
                style={{ cursor: 'pointer' }}
              >
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {currentRows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map(column => (
                <TableCell key={column.accessor}>
                  {column.edit ? (
                    <Button variant="contained" color="primary" component={Link} to={row._id}>
                      Edit
                    </Button>
                  ) : (
                    renderColumn(row, column)
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <Select
          sx={{ width: 100 }}
          value={rowsPerPage}
          onChange={e => setRowsPerPage(parseInt(e.target.value as string, 10))}
          displayEmpty
        >
          {[5, 10, 20, 50].map(size => (
            <MenuItem key={size} value={size}>
              Show {size}
            </MenuItem>
          ))}
        </Select>
        {Array.from({ length: Math.ceil(filteredData.length / rowsPerPage) }, (_, i) => (
          <Button key={i} sx={{ ml: 2 }} onClick={() => paginate(i + 1)} variant="outlined">
            {i + 1}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default DataTable;
