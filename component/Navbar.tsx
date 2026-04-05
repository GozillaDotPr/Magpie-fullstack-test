// components/Navbar.tsx
'use client';

import { AppBar, Toolbar, Typography, IconButton} from '@mui/material';
import { 
  Menu,
  Search,
} from 'lucide-react';

import { useSidebarStore } from '@/store/useSidebar';


export default function Navbar() {
  const {toggle} = useSidebarStore();
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1, 
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit" 
          edge="start"
          onClick={toggle}
          sx={{ mr: 2 }}
        >
          <Menu size={24} />
        </IconButton>
        <Typography variant="h6" noWrap  component="div">
          Magpie Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}