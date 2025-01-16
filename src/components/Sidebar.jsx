import { Box, Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import AddIcon from "../assets/Add.svg";
import ListIcon from "../assets/List.svg";
import ChatIcon from "../assets/Chat.svg";
import SelectList from "../assets/SelectList.svg";
import SelectChat from "../assets/SelectChat.svg";
import SelectAdd from "../assets/SelectAdd.svg";
import LogoutIcon from "../assets/Logout.svg";
import { useUser } from "../contexts/userContext";
import EditPrompt from "../assets/EditPrompt.svg";
import EditPromptSelected from "../assets/EditPromptSelected.svg";
import Escalation from '../assets/Escalation.svg';
import SelectEscalation from '../assets/SelectEscalation.svg';
import Followup from '../assets/Followup.svg';
import SelectFollowup from '../assets/SelectFollowup.svg';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logoutUser } = useUser();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "80px",
        minWidth: "80px",
        backgroundColor: "#F9F9F9",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "50px 0",
      }}
    >
      <Stack
        spacing={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={location.pathname === "/documents/add" ? SelectAdd : AddIcon}
          onClick={() => handleNavigation("/documents/add")}
          style={{ width: "24px", height: "24px", cursor: "pointer" }}
        />
        <img
          src={location.pathname === "/chat" ? SelectChat : ChatIcon}
          onClick={() => handleNavigation("/chat")}
          style={{ width: "24px", height: "24px", cursor: "pointer" }}
        />

        <img
          src={location.pathname === "/documents/list" ? SelectList : ListIcon}
          onClick={() => handleNavigation("/documents/list")}
          style={{ width: "24px", height: "24px", cursor: "pointer" }}
        />

        <img
          src={
            location.pathname === "/prompt" ? EditPromptSelected : EditPrompt
          }
          onClick={() => handleNavigation("/prompt")}
          style={{ width: "22px", height: "22px", cursor: "pointer" }}
        />

        <img
          src={
            location.pathname === "/escalations" ? SelectEscalation : Escalation
          }
          onClick={() => handleNavigation("/escalations")}
          style={{ width: "24px", height: "24px", cursor: "pointer" }}
        />

        <img
          src={
            location.pathname === "/followups" ? SelectFollowup : Followup
          }
          onClick={() => handleNavigation("/followups")}
          style={{ width: "24px", height: "24px", cursor: "pointer" }}
        />
      </Stack>

      <Box sx={{ paddingBottom: "20px" }}>
        <img
          src={LogoutIcon}
          onClick={logoutUser}
          style={{ cursor: "pointer" }}
        />
      </Box>
    </Box>
  );
};

export default Sidebar;
