# agora-uikit
Agora video ui kit for non-react web projects, a wrapper over the [agora-react-uikit](https://www.npmjs.com/package/agora-react-uikit) package.

## Installation
### Package manager
Using npm
```bash
npm install agora-ui-kit
```
Using yarn
```bash
yarn add agora-ui-kit
```
Using pnpm
```bash
pnpm add agora-ui-kit
```
After installation, the package can be imported using import or require
```js
import AgoraUIKit from "agora-ui-kit";
```
```js
const AgoraUIKit = require("agora-ui-kit");
```
### CDN
Unpkg
```html
<script src="https://unpkg.com/agora-ui-kit/dist/agora-ui-kit.min.js"></script>
```
JSDelivr
```html
<script src="https://cdn.jsdelivr.net/gh/nfmshow/agora-ui-kit/dist/agora-ui-kit.min.js"></script>
```
## Usage Example
```js
AgoraUIKit.start({
  appId: "xxxxxx", // Your agora app id
  channel: "my-channel", // Agora channel name
  token: "xxxxxx", // Token 
  uid: 165, // User id - (Integer)
  viewport: document.getElementById("agora-container"), // Optional, HTML Element
  layout: 1, // Optional, 1 for "grid", 0 for "pin". (Default: 1)
  enableAudio: true, // Optional, (Default: true)
  enableVideo: true, // Optional, (Default: true)
  onUserJoin: () => { // Optional
    console.log("User joined");
  }, 
  onUserLeft: () => { // Optional
    console.log("User left");
  }, 
  onCallEnd: () => { // Optional
    console.log("Call ended");
  }, 
});
```
To leave the call programmatically 
```js
await AgoraUIKit.end();
```

If you are working on a react project, use the [main library](https://www.npmjs.com/package/agora-react-uikit) instead.