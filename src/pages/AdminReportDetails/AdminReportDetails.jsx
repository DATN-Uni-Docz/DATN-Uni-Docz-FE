import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import AdminReportDetailsForm from "./components/AdminReportDetailsForm.jsx";
import { useEffect, useMemo, useState } from "react";
import handleError from "../../utils/handleError.js";
import { toast } from "react-toastify";
import { AUTO_CLOSE_TOAST_DURATION } from "../../constants/index.js";
import { getReportById } from "../../api/report/index.js";

const dayConfig = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
}

const AdminReportDetails = () => {
  const { reportId } = useParams();
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const intl = useIntl();
  const initialReportValues = useMemo(() => {
    const {
      id,
      reportType,
      documentId,
      content,
      status,
      reporterId,
      updatedAt,
      createdAt,
    } = report || {};
    return {
      id,
      reportType,
      documentId,
      content,
      status,
      reporterId,
      updatedAt: intl.formatDate(updatedAt, dayConfig),
      createdAt: intl.formatDate(createdAt, dayConfig),
    }
  }, [report, intl]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const response = await getReportById(reportId);
      if (response) {
        setReport(response);
      }
    }
     catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [reportId]);

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "500", fontSize: "28px" }}
      >
        {intl.formatMessage({ id: "AdminReportDetails.title" })}
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "400", color: "var(--colorGrey400)", mb: 4 }}
      >
        {intl.formatMessage({ id: "AdminReportDetails.subtitle" })}
      </Typography>
      {!loading && (
        <AdminReportDetailsForm
          initialValues={{ ...initialReportValues }}
          onSubmit={() => {}}
        />
      )}
    </Box>
  );
}

export default AdminReportDetails;