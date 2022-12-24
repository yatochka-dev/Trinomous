import {Box, Typography} from "@mui/material";

export function Footer() {
    return (
        <Box sx={{
            bgcolor: "primary.main",
            py: 2,


        }}
        component={"footer"}
        >

            <Typography variant="body2" color="#fff" fontSize={20} align="center">
                {'Built by '}
                <a color="inherit" href="https://github.com/yatochka-dev">
                    Yatochka
                </a>
            </Typography>

        </Box>
    )
}