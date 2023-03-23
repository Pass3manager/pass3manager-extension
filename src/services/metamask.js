import { METAMASK_CONSTANTS } from "../constants/metamask";
import PortStream from "extension-port-stream";
import { initializeProvider } from "@metamask/providers";
import browserDetect from "browser-detect";

const browser = browserDetect();

export const createMetamaskProvider = async () => {
  if (!window.ethereum) {
    const metamaskPort = chrome.runtime.connect(getMetaMaskId());
    const pluginStream = new PortStream(metamaskPort);
    initializeProvider({
      connectionStream: pluginStream,
      shouldSetOnWindow: true,
      shouldShimWeb3: true,
    });
  }
};

function getMetaMaskId() {
  switch (browser && browser.name) {
    case METAMASK_CONSTANTS.CHROME_BROWSER_NAME:
      return METAMASK_CONSTANTS.CHROME_ID;
    case METAMASK_CONSTANTS.FIREFOX_BROWSER_NAME:
      return METAMASK_CONSTANTS.FIREFOX_ID;
    default:
      return METAMASK_CONSTANTS.CHROME_ID;
  }
}
