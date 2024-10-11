import { layout } from "agora-react-uikit";
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
declare const agoraUIKit: AgoraUIKit;
export default agoraUIKit;
