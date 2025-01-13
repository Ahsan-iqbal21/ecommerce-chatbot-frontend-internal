import QueriesTable from "../../components/Table";
import useEscalations from "../../hooks/escalations/useEscalation";
import { Typography, Box } from "@mui/material";
import ArrowIcon from "../../assets/Arrow.svg";
import { useNavigate } from "react-router-dom";
import { changeStatus } from "../../store/actions/escalation/escalationActions";
import { useDispatch } from "react-redux";

const Escalations = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { escalations, error, loading } = useEscalations();
    console.log("escalations", escalations);

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
                    <Typography variant="h4">Escalated Queries Page</Typography>
                  </Box>
            {error ? (
                <Typography color="error" variant="h6">
                    {error}
                </Typography>
            ) : (
              <QueriesTable
                queries={escalations}
                loading={loading}
                queryType="Escalation"
                onChangeStatus={(id, status) =>
                  dispatch(changeStatus(id, status))
                }
              />
            
            )}
        </Box>
    );
};

export default Escalations;
