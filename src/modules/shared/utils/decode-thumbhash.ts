import { thumbHashToDataURL } from "thumbhash";

export const decodeThumbhash = (hash: string) => {
  try {
    let bytes: Uint8Array;

    if ("fromBase64" in Uint8Array) {
      // biome-ignore lint/suspicious/noTsIgnore: it's ok
      // @ts-ignore: using experimental Uint8Array.fromBase64 not in TS typings
      bytes = Uint8Array.fromBase64(hash);
    } else {
      const binary = atob(hash);

      bytes = new Uint8Array(binary.length);

      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
    }

    return thumbHashToDataURL(bytes);
  } catch (e) {
    if (e instanceof DOMException) {
      console.error("Base64 decoding failed:", e.message);
    } else if (e instanceof Error) {
      console.error("ThumbHash decoding failed:", e.message);
    } else {
      console.error("Unknown error:", e);
    }

    return "";
  }
};
