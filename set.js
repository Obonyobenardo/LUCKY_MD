const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUVBQQzhLM1VBbTRaM3pvaTc5M2pselZNVWpzWHFDUThvM1BCakFHcnJWOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibmp2TkNRd3VLcUhleUtCdFI0eGR3SllNSDBrUlp0UjVYM2FvKy9RWFpGST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzR2g0am5zWmtxeERSRGJ0RDA0SmRDRURUWkxwQVlJQmZIK3RiMHl4MlVnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvWFBpb2hVdWJqbFZoZkVPWm5pSnlQcU5ITTVrRzFpalE4dVJCZGJWUHo4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtMOUNOdklYZVBORWpuODJyT2RWaTNTRHVVTm9hR2YyY3BmdFF2UkdNRWM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZYeHhlS2JWTUpzeGsvS1duOFRaK0U0d0lmdTJxa1ozdEs4MWdlMVdCMGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUNNT3JIdXR0bVhyY2J2cXBqeTgyaW9wQzhrYmpoTHIzL0VlMnlNSFJWaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicTY5aTduY1U4dlVHbjh0WkM1a2tkS2hFbnBRRjZSc25JTGZEMlBCd3NFZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkErQ0I2MTUrTDMrSEk3cGY4K0Jic3ZoczZ5VnhCM1hKRkVMbWtVMWM4M210NDdMRWw1TDdCVVVOOFAzQVVUYTh2MlpZUzhLZjhCVktLVEdVQ0xVdmlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzMsImFkdlNlY3JldEtleSI6IkY1Qy9taldBU3BSQSs3MGFnRmZDUXVkeDZ1aTZ4L2JRSHhHdm4rUUJHVms9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkM0Rld4ZkpMUWRTdlhiMGsxcjNKdXciLCJwaG9uZUlkIjoiZmFjNGU4NmItMGI5My00YjlhLWFlOWEtOTU3M2IxOWQ3OTNkIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtRbE1iS29CMk5GZTBKMGNXNFZHVkpwcnZ6WT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2dDJOd2o1LzhGamxUTFFwSkxERE1BSGhMVDg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiODRGTUhBODMiLCJtZSI6eyJpZCI6IjI1NDc5OTQxNDI0Njo4N0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS3Uvb0hzUThJRFF1d1lZQWlBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWHQzTGhSSTZRalVPcEt1SFhQb29nZGZpMWY1Sis3OVpjM0dPVjdJVWVFdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVFoydnE2Rk1MVXJrVnM0K2N4ZzBndDNvUUZoeWdSekFlM05aSVRVelZSL3JURUh2UkprbU1rNVY1OHVvRFhLVzdLelVFT2ZhUW1lV3ZSS3VPdm1LQXc9PSIsImRldmljZVNpZ25hdHVyZSI6Ino0Vkt4S3BKK3dtd3NhU0swTVcybmdnVnp4dm81cjhVMjBuMlVQdkppVjJNR3FCeUdoTHpWWFk1QzF0S2VyY0hvcEhaNDBES0VrRytYM0pEV2tESGlnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0Nzk5NDE0MjQ2Ojg3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlY3ZHk0VVNPa0kxRHFTcmgxejZLSUhYNHRYK1NmdS9XWE54amxleUZIaE0ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzU2NTU1NDksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSzBNIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Fredi Ezra",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 254799414246",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'LUCKY_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUDIO_REPLY : process.env.AUDIO_REPLY|| 'no', 
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'no',
                  AUTO_BIO : process.env.AUTO_BIO || 'no',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
