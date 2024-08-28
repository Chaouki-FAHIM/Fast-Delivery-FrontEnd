// src/pages/Colis.tsx
import React, {useEffect, useState} from 'react';
import SideBar from "../components/nav-bar/Sidebar";
import { Tabs, Tab, Box, Typography } from '@mui/material';
import EnhancedTable from "../components/table-management/EnhancedTable";

const Colis: React.FC = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className="flex h-screen">
            <SideBar />

            <div className="flex-1 bg-gray-100 p-8">
                <Typography variant="h3" gutterBottom>
                    Gestion des colis
                </Typography>

                <Box sx={{ width: '100%' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="tabs">
                        <Tab label="Lister" />
                        <Tab label="Ajouter" />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <EnhancedTable/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>

                    </TabPanel>
                </Box>
            </div>
        </div>
    );
};


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default Colis;
