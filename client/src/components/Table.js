import React from "react";
import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
  
function RecordTable(props){
    const classes = useStyles();
    console.log("In table",props.records);
    const rows =props.records;
    return(
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                <TableCell>Email</TableCell>
                <TableCell align="right">First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                <TableRow key={row.email}>
                    <TableCell component="th" scope="row">
                    {row.email}
                    </TableCell>
                    <TableCell align="right">{row.firstName}</TableCell>
                    <TableCell align="right">{row.lastName}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
            )

};

export default RecordTable;