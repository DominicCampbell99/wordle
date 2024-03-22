'use client';
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Word({letters}) {
    
    return (
        <Stack direction='row' spacing={1}>
            {letters.map((letter, index)=> (
                <Box key={index} display='flex' sx={{
                    backgroundColor: letter?.color ? letter?.color : 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: letter?.value ? '2px solid #878A8C' : '2px solid #D3D6DA',
                    height: 50,
                    width: 50,
                    }}>
                    <Typography 
                    textTransform={'capitalize'} 
                    color={'black'}
                    sx={{
                        fontWeight: 900
                    }}
                    >{letter?.value ? letter?.value : ''}
                    </Typography>
                </Box>
            ))}
        </Stack>
        
    );
}
