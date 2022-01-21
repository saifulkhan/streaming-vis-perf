import { useEffect } from "react";
import type { FC } from "react";
import { useRouter } from "next/router";
import { Box, Divider, Drawer, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TimelineIcon from "@mui/icons-material/Timeline";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import PlaceIcon from "@mui/icons-material/Place";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import SearchIcon from "@mui/icons-material/Search";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import Filter1Icon from "@mui/icons-material/Filter1";
import Filter2Icon from "@mui/icons-material/Filter2";
import Filter3Icon from "@mui/icons-material/Filter3";
import PublicIcon from "@mui/icons-material/Public";
import Logo from "src/components/Logo";
import NavSection from "src/components/dashboard-layout/NavSection";
import Scrollbar from "src/components/Scrollbar";

interface DashboardSidebarProps {
  onMobileClose: () => void;
  openMobile: boolean;
}

const sections = [
  {
    title: "Wind Map",
    path: "/wind-map",
    items: [
      {
        title: "SVG",
        path: "/wind-map/?type=svg",
        icon: <Filter1Icon fontSize="small" />,
      },
      {
        title: "Canvas",
        path: "/2",
        icon: <Filter2Icon fontSize="small" />,
      },
      {
        title: "WebGL",
        path: "/3",
        icon: <Filter3Icon fontSize="small" />,
      },
    ],
  },
  {
    title: "Spectrogram",
    path: "/spectrogram",
    items: [
      {
        title: "SVG",
        path: "/1",
        icon: <Filter1Icon fontSize="small" />,
      },
      {
        title: "Canvas",
        path: "/2",
        icon: <Filter2Icon fontSize="small" />,
      },
      {
        title: "WebGL",
        path: "/3",
        icon: <Filter3Icon fontSize="small" />,
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
                Performance
              </Typography>
              <Typography color="primary" alignItems="center" variant="body2">
                Streaming VIS (v.0.1)
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
