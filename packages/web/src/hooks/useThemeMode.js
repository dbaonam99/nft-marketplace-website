import { useEffect, useState } from "react";
import StorageService from "../services/StorageService";

const useThemeMode = () => {
  const [mode, setMode] = useState(StorageService.mode);

  const onModeChange = () => {
    if (StorageService.mode) {
      setMode(StorageService.mode)
    }
  }

  useEffect(() => {
    StorageService.registerListener("nft_theme_mode", onModeChange, { run1st: true })
    return () => {
      StorageService.removeListener("nft_theme_mode", onModeChange);
    }
  }, [])

  return mode === "light";
};

export default useThemeMode;