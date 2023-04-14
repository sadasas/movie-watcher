import { NavbarType } from "@/models/navbar";
import variables from "@/styles/_variables.module.scss";

export default function changeNavbarStyle(navbarType: NavbarType) {
  if (navbarType == NavbarType.TRANSPARENT) {
    document.getElementById("navbar")!.style.cssText +=
      "backdrop-filter: blur(4px); background: rgba(000,000,000,0.5)";
  } else {
    document.getElementById(
      "navbar"
    )!.style.cssText += `background-color: ${variables.primaryBackgroundColor}`;
  }
}
