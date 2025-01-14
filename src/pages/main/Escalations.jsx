import QueriesTable from "../../components/Table";
import useEscalations from "../../hooks/escalations/useEscalation";
import { Typography, Box, TextField, MenuItem, IconButton, Menu } from "@mui/material";
import ArrowIcon from "../../assets/Arrow.svg";
import SortIcon from "../../assets/Sort.svg";
import SortUpIcon from "../../assets/SortUp.svg";
import FilterIcon from "../../assets/filter.svg";
import { useNavigate } from "react-router-dom";
import { changeStatus } from "../../store/actions/escalation/escalationActions";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Escalations = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { escalations, error, loading } = useEscalations();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [sortDirection, setSortDirection] = useState("asc"); // Default sorting direction

  const handleNavigateToAdd = () => {
    navigate("/chat");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (filterValue) => {
    setStatusFilter(filterValue);
    handleFilterClose();
  };

  const handleSortAsc = () => {
    setSortDirection("asc");
  };

  const handleSortDesc = () => {
    setSortDirection("desc");
  };

  const filteredEscalations = escalations
    .filter((query) =>
      query.userName.toLowerCase().includes(search.toLowerCase())
    )
    .filter((query) =>
      statusFilter === "All" || query.status === statusFilter
    )
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  return (
    <Box sx={{ height: "100vh", p: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 2,
          paddingLeft: "35px",
          paddingRight: "35px",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={ArrowIcon}
            onClick={handleNavigateToAdd}
            alt="arrow icon"
            style={{ marginRight: "15px", cursor: "pointer" }}
          />
          <Typography variant="h4">Escalated Queries Page</Typography>
        </Box>

        <Box sx={{ display: "flex", gap: "10px" }}>
          <TextField
            label="Search Here"
            variant="outlined"
            value={search}
            onChange={handleSearch}
            InputProps={{
              inputProps: {
                style: {
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "16.94px",
                  textAlign: "left",
                  color: "#949494",
                },
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {  
                height: '38px',
                width: '362px',
                padding: '0px',
              },
              '& .MuiOutlinedInput-notchedOutline': { 
                border: 'none',
                height: '38px',
              },
            }}
          />

          <IconButton onClick={handleFilterClick} sx={{ width: "50px", height: "50px" }}>
            <img src={FilterIcon} alt="filter icon" style={{ width: "50px", height: "50px" }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleFilterClose}
            MenuListProps={{
              "aria-labelledby": "filter-button",
            }}
          >
            <MenuItem onClick={() => handleFilterChange("All")}>All</MenuItem>
            <MenuItem onClick={() => handleFilterChange("Resolved")}>Resolved</MenuItem>
            <MenuItem onClick={() => handleFilterChange("Unresolved")}>Unresolved</MenuItem>
          </Menu>
          <Box sx={{ display: "flex" }}>
            <IconButton
              onClick={handleSortAsc}
              sx={{
                width: "50px",
                height: "50px",
                backgroundColor: "#fff",
                borderRadius: "8px 0px 0px 8px",
              }}
            >
              <img src={SortUpIcon} alt="sort ascending icon" />
            </IconButton>
            <IconButton
              onClick={handleSortDesc}
              sx={{
                width: "50px",
                height: "50px",
                backgroundColor: "#fff",
                borderRadius: "0px 8px 8px 0px",
              }}
            >
              <img src={SortIcon} alt="sort descending icon" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {error ? (
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      ) : (
        <QueriesTable
          queries={filteredEscalations}
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
