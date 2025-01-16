import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../../assets/Delete.svg";
import ArrowIcon from "../../assets/Arrow.svg";
import useGetDocuments from "../../hooks/documents/useGetDocuments";
import { formatDate } from "../../utils/helperFunctions";
import SuccessToaster from "../../components/SuccessToaster";

const DocumentsList = () => {
  const navigate = useNavigate();
  const {
    documents,
    handleDelete,
    loadingId,
    loading,
    successMessage,
    handleCloseSuccessMessage,
  } = useGetDocuments();

  const handleNavigateToAdd = () => {
    navigate("/documents/add");
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
        <Typography variant="h4">All Documents</Typography>
      </Box>
      <Box sx={{ padding: "35px" }}>
        <TableContainer component={Paper} sx={{ borderRadius: "16px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="document table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h5" sx={{fontWeight: 'bold'}}>Name</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h8" sx={{fontWeight: 'bold'}}>File Format</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h8" sx={{fontWeight: 'bold'}}>Uploading Date</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h8" sx={{fontWeight: 'bold'}}>Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? ( // Show loader inside the table
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                documents &&
                documents.map((doc, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      <Typography variant="h7">{doc.formattedName}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h7">{doc.fileFormat}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h7">
                        {formatDate(doc.uploadDate)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleDelete(doc.documentId)}
                        disabled={loadingId === doc.documentId}
                      >
                        {loadingId === doc.documentId ? (
                          <CircularProgress size={24} />
                        ) : (
                          <img src={DeleteIcon} alt="delete icon" />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <SuccessToaster
        open={Boolean(successMessage)}
        onClose={handleCloseSuccessMessage}
        message={successMessage}
      />
    </Box>
  );
};

export default DocumentsList;
