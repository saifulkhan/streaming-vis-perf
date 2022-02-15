import { useEffect } from "react";
import type { FC } from "react";
import { useRouter } from "next/router";
import { Box, Divider, Drawer, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import AirIcon from "@mui/icons-material/Air";
import WaterfallChartIcon from "@mui/icons-material/WaterfallChart";
import Logo from "src/components/Logo";
import NavSection from "src/components/dashboard-layout/NavSection";
import Scrollbar from "src/components/Scrollbar";

interface DashboardSidebarProps {
  onMobileClose: () => void;
  openMobile: boolean;
}

const sections = [
  {
    title: "",
    items: [
      {
        title: "Spectrum Plot",
        path: "",
        icon: <ShowChartIcon fontSize="large" />,
        children: [
          {
            title: "ProtoBus",
            path: "/page/?vistype=spectrum&protocol=protobuf",
            icon: <LooksOneIcon fontSize="small" />,
          },
          {
            title: "UTF-8",
            path: "/page/?vistype=spectrum&protocol=json",
            icon: <LooksTwoIcon fontSize="small" />,
          },
        ],
      },
    ],
  },
  {
    title: "",
    items: [
      {
        title: "Spectrogram",
        path: "",
        icon: <WaterfallChartIcon fontSize="large" />,
        children: [
          {
            title: "ProtoBus",
            path: "/page/?vistype=spectrogram&protocol=protobuf",
            icon: <LooksOneIcon fontSize="small" />,
          },
          {
            title: "UTF-8",
            path: "/page/?vistype=spectrogram&protocol=json",
            icon: <LooksTwoIcon fontSize="small" />,
          },
        ],
      },
    ],
  },
  {
    title: "",
    items: [
      {
        title: "Windmap",
        path: "",
        icon: <AirIcon fontSize="large" />,
        children: [
          {
            title: "ProtoBus",
            path: "/page/?vistype=windmap&protocol=protobuf",
            icon: <LooksOneIcon fontSize="small" />,
          },
          {
            title: "UTF-8",
            path: "/page/?vistype=windmap&protocol=json",
            icon: <LooksTwoIcon fontSize="small" />,
          },
        ],
      },
    ],
  },
];

const DashboardSidebar: FC<DashboardSidebarProps> = ({
  onMobileClose,
  openMobile,
}) => {
  const { asPath } = useRouter();
  const theme = useTheme();
  const screenIsMobile = !useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (screenIsMobile) {
      onMobileClose();
    }
  }, [screenIsMobile, onMobileClose, asPath]);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Scrollbar options={{ suppressScrollX: true }}>
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "background.default",
              borderRadius: 1,
              display: "flex",
              overflow: "hidden",
              p: 2,
            }}
          >
            {/* <Logo
              sx={{
                height: 60,
                width: 60,
              }}
            /> */}

            <Box sx={{ ml: 2 }}>
              <Typography color="primary" variant="h5">
                streaming vis
              </Typography>
              <Typography color="primary" alignItems="center" variant="caption">
                performance of streaming data vis
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        <Box sx={{ p: 2 }}>
          {sections.map((section, sectionIndex) => (
            <NavSection
              key={sectionIndex}
              pathname={asPath}
              sx={{
                "& + &": {
                  mt: 3,
                },
              }}
              {...section}
            />
          ))}
        </Box>
      </Scrollbar>
    </Box>
  );

  if (!screenIsMobile) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "background.paper",
            height: "calc(100% - 0) !important",
            top: "0px !Important",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onMobileClose}
      open={openMobile}
      PaperProps={{
        sx: {
          backgroundColor: "background.paper",
          width: 280,
        },
      }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

export default DashboardSidebar;
