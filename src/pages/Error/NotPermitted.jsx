import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { ADMIN } from "../../config/roles";
import { useSelector } from "react-redux";
const NotPermitted = () => {
  const role = useSelector((state) => state?.auth?.userInfo?.role);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Typography variant="h1">403</Typography>
              <Typography variant="h6">
                Sorry, you are not authorized to access this page.
              </Typography>
              <Link to={role === ADMIN ? "/admin" : "/"}>
                <Button sx={{ marginTop: "15px" }} variant="contained">
                  Back Home
                </Button>
              </Link>
            </Grid>
            {/* <Grid xs={6}>
              <img
                src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                alt=""
                width={500}
                height={250}
              />
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default NotPermitted;
