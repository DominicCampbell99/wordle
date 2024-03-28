'use client';

import {
  AppBar, Box, IconButton, Toolbar, Typography,
} from '@mui/material';
import {
  BarChart, HelpOutline, Menu, Settings,
} from '@mui/icons-material';
import styled from '@emotion/styled';

const StyledIconButton = styled(IconButton)({
  color: 'black',
  fontSize: 'large',
});

/**
 * A simple header for the application to make it feel more professional
 *
 */
export default function Header() {
  return (
    <AppBar sx={{ borderBottom: '1px solid #D3D6DA', backgroundColor: 'white' }} elevation={0} padding={0} margin={0}>
      <Toolbar sx={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 0,
      }}
      >
        <Box width="40%">
          <StyledIconButton>
            <Menu />
          </StyledIconButton>
        </Box>
        <Box textAlign="center">
          <Typography variant="h4" color="black" fontWeight={700}>
            Wordle
          </Typography>
          <Typography fontSize="10px">
            (clone)
          </Typography>
        </Box>
        <Box justifyContent="flex-end" display="flex" width="40%">
          <StyledIconButton>
            <HelpOutline />
          </StyledIconButton>
          <StyledIconButton>
            <BarChart />
          </StyledIconButton>
          <StyledIconButton>
            <Settings />
          </StyledIconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
