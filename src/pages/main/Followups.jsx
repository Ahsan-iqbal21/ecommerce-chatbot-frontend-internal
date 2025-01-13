import QueriesTable from "../../components/Table";
import { Typography, Box } from "@mui/material";
import ArrowIcon from "../../assets/Arrow.svg";
import { useNavigate } from "react-router-dom";
import useFollowups from "../../hooks/followups/useFollowup";
import { changeStatus } from "../../store/actions/followup/followupActions";
import { useDispatch } from "react-redux";

const Followups = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { followups, error, loading } = useFollowups();

    const handleNavigateToAdd = () => {
        navigate("/chat");
    };

    return (
        <Box sx={{ height: "100vh", p: 3 }}>
            <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 2,
                      paddingLeft: "35px",
                    }}
                  >
                    <img
                      src={ArrowIcon}
                      onClick={handleNavigateToAdd}
                      alt="arrow icon"
                      style={{ marginRight: "15px", cursor: "pointer" }}
                    />
                    <Typography variant="h4">Follow-Ups Page</Typography>
                  </Box>
            {error ? (
                <Typography color="error" variant="h6">
                    {error}
                </Typography>
            ) : (
              <QueriesTable
                queries={followups}
                loading={loading}
                queryType="Followup"
                onChangeStatus={(id, status) =>
                  dispatch(changeStatus(id, status))
                }
              />            
            )}
        </Box>
    );
};

export default Followups;
