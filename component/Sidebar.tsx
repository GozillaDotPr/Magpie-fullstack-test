'use client';

import {
  Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Toolbar, Divider, Box
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { LayoutDashboard, Settings, LogOut } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const menuItems = [
  { text: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { text: 'Settings', icon: Settings, path: '/settings' },
];

import { useSidebarStore } from '@/store/useSidebar';

const Sidebar = () => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const { isOpen } = useSidebarStore();

  const drawerWidthOpen = 240;
  const drawerWidthClose = 65;
  const drawerWidth = isOpen ? drawerWidthOpen : drawerWidthClose;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        transition: 'width 0.3s ease',
        [`& .MuiDrawer-paper`]:
        {
          width: drawerWidth,
          boxSizing: 'border-box',
          overflowX: 'hidden',
          transition: 'width 0.3s ease',
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => router.push(item.path)}
                selected={isActive}
                sx={{
                  '&:hover': { bgcolor: theme.palette.action.hover }
                }}
              >
                <ListItemIcon sx={{ color: isActive ? theme.palette.primary.main : theme.palette.text.secondary }}>
                  <Icon size={20} />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List sx={{ mt: 'auto' }}>
        <ListItem disablePadding>
          <ListItemButton sx={{ '&:hover': { bgcolor: 'rgba(211, 47, 47, 0.1)' } }}>
            <ListItemIcon sx={{ color: theme.palette.error.main }}>
              <LogOut size={20} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;