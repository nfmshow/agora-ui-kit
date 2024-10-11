import React, {
  CSSProperties, 
  FunctionComponent, 
  useState
} from "react";
import { createRoot } from "react-dom/client";
import AgoraReactUIKit, { 
  layout, 
  PropsInterface 
} from "agora-react-uikit";


const VIEWPORT_ID: string = "agora-root";

function getViewport(): HTMLElement {
  /**
     * Gets the display container for the ui kit. 
     * @returns {@link HTMLElement}
     */
  const oldViewport = document.getElementById(VIEWPORT_ID);
	if (oldViewport) {
		return oldViewport;
	}
	const viewport = document.createElement("div");
	viewport.setAttribute("id", VIEWPORT_ID);
	viewport.style.width = "100vw";
	viewport.style.height = "100vh";
	viewport.style.position = "fixed";
	viewport.style.top = "0";
	viewport.style.left = "0";
  viewport.style.zIndex = "50";
	document.body.appendChild(viewport);
  return viewport;
}

function destroyViewport(): void {
	const viewport = document.getElementById(VIEWPORT_ID);
	if (!viewport) {
		return;
	}
	viewport.remove();
}


export interface AgoraUIKitOptions {
  /** Agora app id */
  appId: string;
  /** Agora channel name */
	channel: string;
  /** Agora token */
	token: string;
  /** Optional - (Default: "host") */
	role?: "host" | "audience";
  /** Optional - 1 (Grid) or 0 (Pin). (Default: 1). */
	layout?: layout;
  /** User ID - Integer, */
	uid: number;
  /** Optional, If false, audio is disabled before joining the meeting. (Default: true). */
  enableAudio?: boolean;
  /** Optional, If false, camera is disabled before joining the meeting. (Default: true). */
  enableVideo?: boolean;
  /** Optional, function to be called when a user joins the meeting. */
	onUserJoin?: () => any;
  /** Optional, function to be called when a user leaves the meeting. */  
	onUserLeft?: () => any;
  /** Optional, function to be called when the meeting ends. */
	onCallEnd?: () => any;
  /** Optional - Display container for the ui kit. If not specified, a "fixed" positioned div of the window size is created. */
  viewport?: HTMLElement;
}
  
export interface AgoraUIKit {
  /** Launches the ui kit. */
	start: (o: AgoraUIKitOptions) => any;
  /** Destroys the ui kit instance. Does nothing if kit has not been launched. */
	end: () => void;
  /** Private - Unmounts the ui kit. */
	unmount?: () => void;
  /** Private - Ui kit options. */
	options?: AgoraUIKitOptions;
}
  
declare global {
	interface Window {
		AgoraUIKit: AgoraUIKit;
	}
}

const agoraUIKit: AgoraUIKit = {
	start: function(options: AgoraUIKitOptions) {
    /**
     * Launches the agora ui kit sdk
     * @param {@link AgoraUIKitOptions} - Initialization options
     * @returns {void}
     */
		this.end();
		const viewport = options.viewport || getViewport();
		this.options = options;
    const props: PropsInterface = {
      rtcProps: {
        appId: options.appId,
        channel: options.channel, 
        token: options.token, 
        layout: (typeof(options.layout) === "undefined") ? layout.grid : options.layout, 
        enableScreensharing: true, 
        uid: options.uid, 
        enableAudio: (typeof(options.enableAudio) === "undefined") ? true : options.enableAudio, 
        enableVideo: (typeof(options.enableVideo) === "undefined") ? true : options.enableVideo, 
      },
      callbacks: {
        "EndCall": () => {
          this.end();
        }, 
        "user-joined": () => {
          if (options.onUserJoin) {
            options.onUserJoin();
          }
        }, 
        "user-left": () => {
          if (options.onUserLeft) {
            options.onUserLeft();
          }
        }
      }
    };
    const containerStyle: CSSProperties = {
      width: "100%", 
      height: "100%", 
      display: "flex", 
      flex: 1
    };
		const Root: FunctionComponent = () => {
      const [ mount, setMount ] = useState<boolean>(true);
      this.unmount = () => {
        setMount(false);
      }
      return <div style={containerStyle}>
        {mount ? <AgoraReactUIKit { ...props } /> : <></>}
      </div>;
    }
    createRoot(viewport).render(
      <React.StrictMode>
        <Root />
      </React.StrictMode>,
    );
	}, 
	end: async function() {
    /**
     * Destroys the ui kit instance. Does nothing if kit has not been launched.
     * @returns {void}
     */
		if (this.unmount) {
			this.unmount();
			this.unmount = undefined;
      await new Promise((resolve) => {
        setTimeout(resolve, 50);
      });
		}
    if (this.options?.viewport) {
      return;
    }
		destroyViewport();
	}
};

window.AgoraUIKit = agoraUIKit;

export default agoraUIKit;


/*
const script = document.createElement("script");
script.setAttribute("src", "/dist/agora-ui-kit.min.js");
script.onload = function() {
  console.log("Umd loaded");
}
document.head.append(script);

AgoraUIKit.start({
    "appId": "b321bd1e99dd4d2897efdc44bceb32c5",
    "channel": "test_meeting_42",
    "token": "007eJxTYGDYXmv4w4i7N+3UWov5zy66xtu9fC2lvrovM6j2cP3B0D0KDEnGRoZJKYaplpYpKSYpRhaW5qlpKckmJknJqUCpZNPc1xzpOowMDB2sAiyMDIwMLEAM4jOBSWYwyQIm+RlKUotL4nNTU0sy89LjTYxYGIxMDM0AaE0j2A==",
    "userId": 2416,
})
*/