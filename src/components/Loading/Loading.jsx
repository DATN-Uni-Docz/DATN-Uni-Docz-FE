import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1300,
                backdropFilter: "blur(3px)",
                flexDirection: "column",
                gap: "10px"
            }}
        >
            <CircularProgress sx={{ color: "var(--admin-color)" }} size={60} />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    gap: "5px",
                }}
            >
                <span>Loading</span>
                <Box
                    sx={{
                        display: "flex",
                        gap: "2px",
                    }}
                >
                    <Box
                        sx={{
                            width: "5px",
                            height: "5px",
                            backgroundColor: "black",
                            borderRadius: "50%",
                            animation: "jump 1s infinite",
                            animationDelay: "0s",
                        }}
                    ></Box>
                    <Box
                        sx={{
                            width: "5px",
                            height: "5px",
                            backgroundColor: "black",
                            borderRadius: "50%",
                            animation: "jump 1s infinite",
                            animationDelay: "0.2s",
                        }}
                    ></Box>
                    <Box
                        sx={{
                            width: "5px",
                            height: "5px",
                            backgroundColor: "black",
                            borderRadius: "50%",
                            animation: "jump 1s infinite",
                            animationDelay: "0.4s",
                        }}
                    ></Box>
                </Box>
            </Box>
            <style>
                {`
                @keyframes jump {
                    0%, 80%, 100% {
                        transform: scale(1);
                    }
                    40% {
                        transform: scale(1.5);
                    }
                }
                `}
            </style>
        </Box>
    );
};

export default Loading;
