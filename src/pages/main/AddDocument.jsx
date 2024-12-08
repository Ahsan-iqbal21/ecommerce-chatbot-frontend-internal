import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import WelcomeIcon from "../../assets/WelcomeIcon.svg";
import DragDropIcon from "../../assets/DragDrop.svg";
import PdfIcon from "../../assets/PdfIcon.svg";
import CrossIcon from "../../assets/Cross.svg";
import useAddDocument from "../../hooks/documents/useAddDocument";
import SuccessToaster from "../../components/SuccessToaster";

const AddDocument = () => {
  const { control, handleSubmit, watch, setValue } = useForm();
  const {
    isUploading,
    handleFileUpload,
    successMessage,
    errorMessage,
    setErrorMessage,
  } = useAddDocument();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const watchedFile = watch("file");

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles[0]) {
        const file = acceptedFiles[0];
        if (file.size > 10 * 1024 * 1024) {
          setErrorMessage("File size exceeds 10MB limit.");
        } else {
          setErrorMessage("");
          setValue("file", file);
        }
      }
    },
    [setValue, setErrorMessage]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  const onSubmit = async (data) => {
    if (data.file && data.file.size > 10 * 1024 * 1024) {
      setErrorMessage("File size exceeds 10MB limit.");
      return;
    }

    setErrorMessage("");
    if (data.file) {
      await handleFileUpload(data.file);
    }
  };

  useEffect(() => {
    if (successMessage) {
      setValue("file", null);
      setMessage(successMessage);
      setOpen(true);
    }
  }, [successMessage, setValue]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveFile = () => {
    setValue("file", null);
    setErrorMessage("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "50px",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <img
            src={WelcomeIcon}
            style={{ marginBottom: "20px", width: "64px", height: "64px" }}
            alt="Welcome Icon"
          />
          <Typography variant="h1" gutterBottom sx={{ fontWeight: "bold" }}>
            Welcome Back
          </Typography>
          <Typography variant="h3" gutterBottom>
            Please upload a document to help the chatbot
          </Typography>
        </Box>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "50px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%" }} {...getRootProps()}>
            <Controller
              name="file"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <input
                  {...getInputProps()}
                  onChange={(e) => field.onChange(e.target.files[0])}
                  disabled={isUploading}
                />
              )}
            />
            <img
              src={DragDropIcon}
              style={{ width: "100%", cursor: "pointer" }}
              alt="Drag and Drop Icon"
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
            >
              <Typography variant="body3">Supported Formats: Word</Typography>
              <Typography variant="body3">Maximum Size: 10MB</Typography>
            </Box>
          </Box>

          {watchedFile && (
            <Box
              sx={{
                width: "100%",
                height: "89px",
                borderRadius: "18px",
                backgroundColor: "#F9F9F9",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "20px",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <img
                  src={PdfIcon}
                  style={{ width: "48px", height: "48px" }}
                  alt="PDF Icon"
                />
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "5px" }}
                >
                  <Typography variant="h5">{watchedFile.name}</Typography>
                  <Typography variant="body4">
                    {(watchedFile.size / 1024 / 1024).toFixed(2)} MB
                  </Typography>
                </Box>
              </Box>
              <Box>
                {!isUploading && (
                  <img
                    onClick={handleRemoveFile}
                    src={CrossIcon}
                    style={{ cursor: "pointer" }}
                    alt="Remove File"
                  />
                )}
              </Box>
            </Box>
          )}

          <Box>
            <Button
              variant="contained"
              sx={{
                width: "317px",
                color: "white",
              }}
              type="submit"
              disabled={isUploading || !watchedFile}
            >
              {isUploading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Upload Document"
              )}
            </Button>

            {errorMessage && (
              <Typography
                variant="body2"
                color="error"
                sx={{ textAlign: "center", mt: 2 }}
              >
                {errorMessage}
              </Typography>
            )}
          </Box>
        </form>

        <SuccessToaster open={open} onClose={handleClose} message={message} />
      </Box>
    </Box>
  );
};

export default AddDocument;
