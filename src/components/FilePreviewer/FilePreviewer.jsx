import { Viewer, ThemeContext } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/zoom/lib/styles/index.css";

import { searchPlugin } from "@react-pdf-viewer/search";
import "@react-pdf-viewer/search/lib/styles/index.css";

import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

import { themePlugin } from "@react-pdf-viewer/theme";
import { useState } from "react";

const FilePreviewer = ({ url }) => {
  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

  const searchPluginInstance = searchPlugin({});
  const { ShowSearchPopoverButton } = searchPluginInstance;

  const pageNavigationPluginInstance = pageNavigationPlugin();
  const {
    CurrentPageInput,
    GoToNextPageButton,
    GoToPreviousPage,
    NumberOfPages,
  } = pageNavigationPluginInstance;

  const themePluginInstance = themePlugin();
  const { SwitchThemeButton } = themePluginInstance;

  const [currentTheme, setCurrentTheme] = useState('light');
const themeContext = { currentTheme, setCurrentTheme };

  return (
    <ThemeContext.Provider value={themeContext}>
      <div
        className={`rpv-core__viewer rpv-core__viewer--${currentTheme}`}
        style={{
          border: "1px solid rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            backgroundColor: currentTheme === 'dark' ? 'var(--colorBlack)' : 'var(--secondaryColor)',
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "space-between",
            padding: "4px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ShowSearchPopoverButton />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ZoomOutButton />
            <ZoomPopover />
            <ZoomInButton />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <SwitchThemeButton />
          </div>
        </div>
        <div
          style={{
            flex: 1,
            overflow: "hidden",
          }}
        >
          <Viewer
            fileUrl={url}
            plugins={[
              zoomPluginInstance,
              searchPluginInstance,
              pageNavigationPluginInstance,
            ]}
            theme={currentTheme}
          />
        </div>
        <div
          style={{
            alignItems: "center",
            backgroundColor: currentTheme === 'dark' ? 'var(--colorBlack)' : 'var(--secondaryColor)',
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "center",
            padding: "4px",
          }}
        >
          <div style={{ padding: "0px 2px" }}>
            <GoToPreviousPage />
          </div>
          <div
            style={{
              padding: "0px 2px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <CurrentPageInput /> / <NumberOfPages />
          </div>
          <div style={{ padding: "0px 2px" }}>
            <GoToNextPageButton />
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default FilePreviewer;
