import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { Check, Close } from "@mui/icons-material";
import { SUBSCRIPTION_PLANS } from "../../constants";
import { convertToMoney } from "../../helper";

const feature1 = "Access to all basic features";
const feature2 = "Email support";
const feature3 = "24/7 customer support";
const feature4 = "Early access to new features";
const feature5 = "Advanced search filters";
const feature6 = "Ad-free experience";

const featureList = [
  feature1,
  feature2,
  feature3,
  feature4,
  feature5,
  feature6,
];

const featureOnType = {
  BASIC: [feature1, feature2, feature3],
  STANDARD: [feature1, feature2, feature3, feature4],
  PREMIUM: [feature1, feature2, feature3, feature4, feature5, feature6],
};

const PricingCard = (props) => {
  const { intl, type, price, duration, unit, handleClickCard } = props;
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 4,
        p: 4,
        mb: 2,
        maxWidth: 360,
        textAlign: "center",
        boxShadow: 1,
        cursor: "pointer",
        backgroundColor: "var(--colorWhite)",
        "&:hover": {
          boxShadow: 4,
          transform: "translateY(-4px)",
          transition: "transform 0.5s, box-shadow 0.5s",
        },
      }}
      onClick={handleClickCard}
    >
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
        {intl.formatMessage(
          { id: "PricingPage.pricingCard.planName" },
          {
            name: type,
          }
        )}
      </Typography>
      <Typography
        variant="h6"
        sx={{ mb: 1, color: "var(--primaryColor)", fontSize: "40px" }}
      >
        {convertToMoney(price)}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "var(--colorGrey400)" }}>
        {intl.formatMessage(
          { id: "PricingPage.pricingCard.duration" },
          { duration, unit }
        )}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {featureList.map((feature, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
            {featureOnType[type]?.includes(feature) ? (
              <>
                <Check color="primary" />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {feature}
                </Typography>
              </>
            ) : (
              <>
                <Close color="disabled" />
                <Typography
                  variant="body1"
                  sx={{ ml: 1, color: "var(--colorGrey400)" }}
                >
                  {feature}
                </Typography>
              </>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const Pricing = () => {
  const navigate = useNavigate();
  const intl = useIntl();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "var(--secondaryColor)",
          py: 4,
          minHeight: 'calc(100vh - var(--navbarHeight))'
        }}
      >
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 500 }}>
          {intl.formatMessage({ id: "PricingPage.title" })}
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 2, fontSize: "20px", color: "var(--colorGrey400)" }}
        >
          {intl.formatMessage({ id: "PricingPage.subtitle" })}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "30px",
            mt: 3,
          }}
        >
          {Object.entries(SUBSCRIPTION_PLANS).map(([type, value]) => {
            return (
              <PricingCard
                key={type}
                intl={intl}
                type={type}
                handleClickCard={() => navigate(`/payment/${type?.toLowerCase()}`)}
                {...value}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
export default Pricing;
