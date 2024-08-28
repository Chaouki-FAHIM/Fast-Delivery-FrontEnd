import React, { useEffect, useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Typography, Checkbox } from '@mui/material';
import ColisService from '../../services/ColisService';
import { ColisRes } from '../../models/Colis';

// Types pour la gestion des états du tableau
type Order = 'asc' | 'desc';

interface HeadCell {
    id: keyof ColisRes;
    numeric: boolean;
    disablePadding: boolean;
    label: string;
}

// Définir les colonnes de l'en-tête du tableau
const headCells: readonly HeadCell[] = [
    { id: 'reference', numeric: false, disablePadding: true, label: 'Référence' },
    { id: 'ville', numeric: false, disablePadding: false, label: 'Ville' },
    { id: 'statutColis', numeric: false, disablePadding: false, label: 'Statut' },
    { id: 'nom', numeric: false, disablePadding: false, label: 'Nom' },
    { id: 'prenom', numeric: false, disablePadding: false, label: 'Prénom' },
    { id: 'dateCreation', numeric: false, disablePadding: false, label: 'Date de Création' },
    { id: 'numeroTelephone', numeric: false, disablePadding: false, label: 'Téléphone' },
    { id: 'montant', numeric: true, disablePadding: false, label: 'Montant (Dhs)' },
    { id: 'fraisLivraison', numeric: true, disablePadding: false, label: 'Frais (Dhs)' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
];

// Méthode pour obtenir la classe de badge en fonction du statut
const getBadgeClass = (status: string) => {
    switch (status) {
        case 'En attente':
            return 'badge bg-secondary'; // Gray
        case 'Ramasser':
            return 'badge bg-primary'; // Blue
        case 'En cours de livraison':
            return 'badge bg-warning text-dark'; // Yellow
        case 'Livré':
            return 'badge bg-success'; // Green
        case 'Refusé':
            return 'badge bg-danger'; // Red
        case 'Annulé':
            return 'badge bg-dark'; // Dark
        default:
            return 'badge bg-light'; // Default badge
    }
};

function EnhancedTableHead(props: {
    numSelected: number;
    order: Order;
    orderBy: string;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ColisRes) => void;
    rowCount: number;
}) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof ColisRes) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all colis',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function EnhancedTableToolbar(props: { numSelected: number }) {
    const { numSelected } = props;

    return (
        <Toolbar>
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} sélectionné(s)
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Liste des Colis
                </Typography>
            )}
        </Toolbar>
    );
}

export default function EnhancedTable() {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof ColisRes>('reference');
    const [selected, setSelected] = useState<readonly number[]>([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState<ColisRes[]>([]);

    useEffect(() => {
        ColisService.getAllColis()
            .then(data => setRows(data))
            .catch(error => console.error('Erreur lors de la récupération des colis:', error));
    }, []);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof ColisRes,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rows
                                .slice()
                                .sort((a, b) => {
                                    if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
                                    if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
                                    return 0;
                                })
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    const isItemSelected = isSelected(row.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': `enhanced-table-checkbox-${row.id}`,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={`enhanced-table-checkbox-${row.id}`} scope="row" padding="none">
                                                {row.reference}
                                            </TableCell>
                                            <TableCell>{row.ville}</TableCell>
                                            <TableCell>
                                                <span className={getBadgeClass(row.statutColis) }>
                                                        {row.statutColis}

                                                </span>
                                            </TableCell>
                                            <TableCell><i>{row.nom}</i></TableCell>
                                            <TableCell><i>{row.prenom}</i></TableCell>
                                            <TableCell>{new Date(row.dateCreation).toLocaleDateString()} {new Date(row.dateCreation).toLocaleTimeString()}</TableCell>
                                            <TableCell>{row.numeroTelephone}</TableCell>
                                            <TableCell align="right">{row.montant.toFixed(2)}</TableCell>
                                            <TableCell align="right">{row.fraisLivraison.toFixed(2)}</TableCell>
                                            <TableCell>{row.description}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
