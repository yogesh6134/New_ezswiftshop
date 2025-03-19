// import CryptoJS from 'crypto-js';

// mm/dd/yyyy
export const DateFormat = (inputDateString) => {
  const inputDate = new Date(inputDateString);
  const month = inputDate.getMonth() + 1; // January is 0, so we add 1
  const day = inputDate.getDate();
  const year = inputDate.getFullYear();

  return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
};

// 10:02 PM
export const formatTime = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // If hours is 0, set it to 12
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();
  return `${hours}:${formattedMinutes} ${period}`;
};

// 11 Jan
export const formatDateTime = (date) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${day} ${month}`;
};

// Extract domain name from URL
// export const getDomainName = (url) => {
//   try {
//     const match = url.match(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/i);
//     if (match && match[1]) {
//       return match[1].replace(/^www\./, '');
//     }
//     return null;
//   } catch (error) {
//     console.error("Invalid URL", error);
//     return null;
//   }
// };

// Output: 07/Aug/2024 06:32AM
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();
  const isAM = hours < 12;
  hours = hours % 12 || 12;
  const period = isAM ? 'AM' : 'PM';

  const paddedMinutes = String(minutes).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${paddedMinutes}${period}`;
};

// Format countdown time (mm:ss)
export const formatCountdownTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// AES Decryption
// export function decryptAES(encryptedContent, keyHex, ivHex) {
//   const key = CryptoJS.enc.Hex.parse(keyHex);
//   const iv = CryptoJS.enc.Hex.parse(ivHex);
  
//   const decrypted = CryptoJS.AES.decrypt(encryptedContent, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  
//   return CryptoJS.enc.Utf8.stringify(decrypted);
// }

// Extract YouTube Playlist ID from URL
// export const getPlaylistId = (url) => {
//   const regex = /[?&]list=([a-zA-Z0-9_-]+)/; // Regex to match the playlist ID
//   const match = url.match(regex);
//   return match ? match[1] : null;
// };

// Check if URL is a YouTube Playlist
// export const isPlaylistUrl = (url) => {
//   try {
//     const parsedUrl = new URL(url);
//     return parsedUrl.searchParams.has('list');
//   } catch (error) {
//     console.error("Invalid URL:", error);
//     return false;
//   }
// };

// Shuffle Array
export const shuffleArray = (array) => {
  const arrayCopy = [...array];
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }
  return arrayCopy;
};
