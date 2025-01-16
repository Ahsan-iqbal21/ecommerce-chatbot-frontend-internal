import { Box, Stack, Tooltip, Dialog, DialogContent, DialogActions, Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
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
import Escalation from "../assets/Escalation.svg";
import SelectEscalation from "../assets/SelectEscalation.svg";
import Followup from "../assets/Followup.svg";
import SelectFollowup from "../assets/SelectFollowup.svg";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logoutUser } = useUser();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logoutUser();
    setOpenLogoutDialog(false);
  };

  const handleCancelLogout = () => {
    setOpenLogoutDialog(false);
  };

  return (
    <>
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
          <Tooltip title="Add Document" arrow>
            <img
              src={location.pathname === "/documents/add" ? SelectAdd : AddIcon}
              onClick={() => handleNavigation("/documents/add")}
              style={{ width: "24px", height: "24px", cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Chat" arrow>
            <img
              src={location.pathname === "/chat" ? SelectChat : ChatIcon}
              onClick={() => handleNavigation("/chat")}
              style={{ width: "24px", height: "24px", cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Escalations" arrow>
            <img
              src={
                location.pathname === "/escalations"
                  ? SelectEscalation
                  : Escalation
              }
              onClick={() => handleNavigation("/escalations")}
              style={{ width: "24px", height: "24px", cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Follow-ups" arrow>
            <img
              src={
                location.pathname === "/followups"
                  ? SelectFollowup
                  : Followup
              }
              onClick={() => handleNavigation("/followups")}
              style={{ width: "24px", height: "24px", cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Document List" arrow>
            <img
              src={
                location.pathname === "/documents/list" ? SelectList : ListIcon
              }
              onClick={() => handleNavigation("/documents/list")}
              style={{ width: "24px", height: "24px", cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Edit Prompt" arrow>
            <img
              src={
                location.pathname === "/prompt"
                  ? EditPromptSelected
                  : EditPrompt
              }
              onClick={() => handleNavigation("/prompt")}
              style={{ width: "22px", height: "22px", cursor: "pointer" }}
            />
          </Tooltip>
        </Stack>

        <Box sx={{ paddingBottom: "20px" }}>
          <Tooltip title="Logout" arrow>
            <img
              src={LogoutIcon}
              onClick={() => setOpenLogoutDialog(true)}
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
        </Box>
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={openLogoutDialog}
        onClose={handleCancelLogout}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            padding: "24px",
            backgroundColor: "#f8f8f8",
          },
        }}
      >
        <DialogContent>
          <Typography
            variant="h6"
            align="center"
            sx={{ fontWeight: "bold", mb: 3, color: "#000" }}
          >
            Are you sure you want to log out?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: "16px" }}>
          <Button
            onClick={handleCancelLogout}
            sx={{
              minWidth: "120px",
              height: "42px",
              backgroundColor: "#f5f5f5",
              color: "#000",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            sx={{
              minWidth: "120px",
              height: "42px",
              backgroundColor: "#5F46CC",
              color: "white",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#4B3BA6",
              },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sidebar;
