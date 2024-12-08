import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import useLogin from "../../hooks/user/useLogin";
import LoginPoster from "../../assets/LoginPoster.svg";
import WelcomeIcon from "../../assets/WelcomeIcon.svg";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { handleLogin, loading, error } = useLogin();

  const onSubmit = (data) => {
    handleLogin(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100%",
        backgroundColor: "#E5EAF4",
      }}
    >
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "50px",
        }}
      >
        <Box>
          <img
            src={WelcomeIcon}
            style={{ marginBottom: "10px" }}
            alt="Welcome Icon"
          />
          <Typography variant="h2" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body1">
            Enter your username and password to continue.
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Email
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Enter your email address"
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                InputProps={{
                  sx: {
                    padding: "0 16px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  },
                }}
                sx={{
                  width: "421px",
                }}
              />
              {errors.email && (
                <Typography
                  color="error"
                  sx={{ paddingLeft: 0, textAlign: "left", mt: 2 }}
                >
                  {errors.email.message}
                </Typography>
              )}
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Password
              </Typography>
              <TextField
                type="password"
                variant="outlined"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                InputProps={{
                  sx: {
                    padding: "0 16px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  },
                }}
                sx={{
                  width: "421px",
                }}
              />
              {errors.password && (
                <Typography
                  color="error"
                  sx={{ paddingLeft: 0, textAlign: "left", mt: 2 }}
                >
                  {errors.password.message}
                </Typography>
              )}
            </Box>

            {error && <Typography color="error">{error}</Typography>}

            <Button
              type="submit"
              variant="contained"
              sx={{ width: "421px", height: "51px" }}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </Box>
        </form>
      </Box>
      <Box sx={{ width: "50%", height: "100%", padding: "40px" }}>
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "22px",
          }}
          src={LoginPoster}
          alt="Login Poster"
        />
      </Box>
    </Box>
  );
};

export default Login;
