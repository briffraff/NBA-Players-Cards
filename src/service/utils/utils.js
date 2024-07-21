import CryptoJS from "crypto-js";

export const generateHashFromBase64 = (base64String) => {
    const hash = CryptoJS.SHA256(CryptoJS.enc.Base64.parse(base64String));
    return hash.toString(CryptoJS.enc.Hex);
};

