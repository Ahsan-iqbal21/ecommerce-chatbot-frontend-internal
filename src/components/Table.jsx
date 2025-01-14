import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";
import Resolve from "../assets/Resolve.svg";
import Reject from "../assets/Reject.svg";
import Resolved from "../assets/Resolved.svg";
import Rejected from "../assets/Rejected.svg";
import History from "../assets/History.svg";
import { formatDate } from "../utils/helperFunctions";

const QueriesTable = ({ queries, loading, queryType, onChangeStatus }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openPopup, setOpenPopup] = useState(false);
  const [chatHistory, setChatHistory] = useState(null);
  const [selectedQuery, setSelectedQuery] = useState(null);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleOpenPopup = (query) => {
    setOpenPopup(true);
    setChatHistory(query.conversationHistory);
    setSelectedQuery(query);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setChatHistory(null);
    setSelectedQuery(null);
  };

  const paginatedQueries = queries?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const renderActionButtons = (query) => {
    const queryId = queryType === "Escalation" ? query.escalationId : query.followupId;

    if (query.status === "Active") {
      return (
        <>
          <IconButton sx={{ width: "38px", height: "38px" }} onClick={() => onChangeStatus(queryId, "Resolved")}>
            <img src={Resolve} alt="resolve icon" />
          </IconButton>
          <IconButton sx={{ width: "38px", height: "38px" }} onClick={() => onChangeStatus(queryId, "Rejected")}>
            <img src={Reject} alt="reject icon" />
          </IconButton>
        </>
      );
    } else if (query.status === "Resolved") {
      return (
        <>
          <IconButton sx={{ width: "38px", height: "38px" }}>
            <img src={Resolved} alt="resolved icon" />
          </IconButton>
          <IconButton disabled sx={{ width: "38px", height: "38px" }}>
            <img src={Reject} alt="reject icon" />
          </IconButton>
        </>
      );
    } else if (query.status === "Rejected") {
      return (
        <>
          <IconButton disabled sx={{ width: "38px", height: "38px" }}>
            <img src={Resolve} alt="resolve icon" />
          </IconButton>
          <IconButton sx={{ width: "38px", height: "38px" }}>
            <img src={Rejected} alt="rejected icon" />
          </IconButton>
        </>
      );
    }
  };

  const renderPaginationButtons = () => {
    if (!queries || queries.length === 0) return null;

    const pageCount = Math.ceil(queries.length / rowsPerPage);
    const buttons = [];

    buttons.push(
      <Button
        key="prev"
        onClick={() => handleChangePage(page - 1)}
        disabled={page === 0}
        sx={{
          minWidth: "42px",
          height: "42px",
          padding: "4px",
          margin: "0 4px",
          backgroundColor: "white",
          color: "black",
          "&:disabled": {
            backgroundColor: "#f5f5f5",
            color: "#bdbdbd",
          },
        }}
      >
        {"<"}
      </Button>
    );

    for (let i = 0; i < pageCount; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handleChangePage(i)}
          sx={{
            minWidth: "42px",
            height: "42px",
            padding: "4px",
            margin: "0 4px",
            backgroundColor: page === i ? "#5F46CC" : "white",
            color: page === i ? "white" : "black",
          }}
        >
          {i + 1}
        </Button>
      );
    }

    buttons.push(
      <Button
        key="next"
        onClick={() => handleChangePage(page + 1)}
        disabled={page >= pageCount - 1}
        sx={{
          minWidth: "42px",
          height: "42px",
          padding: "4px",
          margin: "0 4px",
          backgroundColor: "white",
          color: "black",
          "&:disabled": {
            backgroundColor: "#f5f5f5",
            color: "#bdbdbd",
          },
        }}
      >
        {">"}
      </Button>
    );

    return buttons;
  };

  return (
    <Box sx={{ padding: "35px" }}>
      <TableContainer component={Paper} sx={{ borderRadius: "16px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="queries table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ minWidth: "100px" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Name
                </Typography>
              </TableCell>
              <TableCell align="left" sx={{ minWidth: "100px" }}>
                <Typography variant="h8" sx={{ fontWeight: "bold" }}>
                  Email
                </Typography>
              </TableCell>
              <TableCell align="left" sx={{ minWidth: "100px" }}>
                <Typography variant="h8" sx={{ fontWeight: "bold" }}>
                  Phone
                </Typography>
              </TableCell>
              <TableCell align="left" sx={{ minWidth: "100px" }}>
                <Typography variant="h8" sx={{ fontWeight: "bold" }}>
                  Summary
                </Typography>
              </TableCell>
              <TableCell align="left" sx={{ minWidth: "125px" }}>
                <Typography variant="h8" sx={{ fontWeight: "bold" }}>
                  Created At
                </Typography>
              </TableCell>
              <TableCell align="left" sx={{ minWidth: "100px" }}>
                <Typography variant="h8" sx={{ fontWeight: "bold" }}>
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : queries && queries.length > 0 ? (
              paginatedQueries.map((query, index) => (
                <TableRow key={index}>
                  <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    sx={{ minWidth: "100px" }}
                  >
                    <Typography variant="h7">{query.userName}</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "100px" }}>
                    <Typography variant="h7">{query.userEmail}</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "100px" }}>
                    <Typography variant="h7">{query.userPhone}</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "100px" }}>
                    <Typography variant="h7">
                      {query.conversationSummary}
                    </Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ minWidth: "125px" }}>
                    <Typography variant="h7">
                      {formatDate(query.createdAt)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      {renderActionButtons(query)}
                      <IconButton
                        sx={{ width: "38px", height: "38px" }}
                        onClick={() => handleOpenPopup(query)}
                      >
                        <img src={History} alt="see conversation icon" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="h6">No queries available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {queries && queries.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          {renderPaginationButtons()}
        </Box>
      )}
      <Dialog
        open={openPopup}
        onClose={handleClosePopup}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            width: "822px",
            height: "714px",
            borderRadius: "26px",
          },
        }}
      >
        {selectedQuery && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              borderBottom: "1px solid #dedede",
              padding: "20px",
              paddingLeft: "25px",
              backgroundColor: "#f8f8f8",
              gap: '25px',
            }}
          >
            <Box sx={{minWidth: '100px'}}>
              <Typography sx={{textAlign: 'left', fontSize: '14px', fontWeight: '500', marginBottom: '5px'}}>Name</Typography>
              <Typography variant="h6">{selectedQuery.userName}</Typography>
            </Box>
            <Box sx={{minWidth: '100px'}}>
              <Typography sx={{textAlign: 'left', fontSize: '14px', fontWeight: '500', marginBottom: '5px'}}>Email</Typography>
              <Typography variant="h6" >{selectedQuery.userEmail}</Typography>
            </Box>
            <Box sx={{minWidth: '100px'}}>
              <Typography sx={{textAlign: 'left', fontSize: '14px', fontWeight: '500', marginBottom: '5px'}}>Phone No</Typography>
              <Typography variant="h6">{selectedQuery.userPhone}</Typography>
            </Box>
          </Box>
        )}
        <DialogContent>
          {chatHistory &&
            chatHistory.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  mb: 2,
                  display: "flex",
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  sx={{
                    maxWidth: "75%",
                    pl: 1.5,
                    pr: 1.5,
                    borderRadius: msg.role === "user" ? "33px" : "18px",
                    background:
                      msg.causedBy && msg.causedBy === true
                        ? "linear-gradient(252.8deg, #FFF0DC 0.89%, #F3FFE9 46.41%, #FFF3F3 93.22%)"
                        : msg.role === "user"
                        ? "#5F46CC"
                        : "#F4F4F4",
                    color:
                      msg.causedBy && msg.causedBy === true
                        ? "#000"
                        : msg.role === "user"
                        ? "white"
                        : "#000",
                    textAlign: "left",
                  }}
                >
                  <Typography variant="body6">
                    <ReactMarkdown>{msg.message}</ReactMarkdown>
                  </Typography>
                </Box>
              </Box>
            ))}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default QueriesTable;
