"use client"
import { useDeviceSize } from "../../../../hooks/useDeviceSize";
import NavigationDesktop from "./Navigation.Desktop";
import NavigationMobile from "./Navigation.Mobile";

export default function Navigation() {
  const { isMobile } = useDeviceSize();
  return <>{isMobile ? <NavigationMobile /> : <NavigationDesktop />}</>;
}
