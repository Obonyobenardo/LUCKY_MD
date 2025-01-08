const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1BsMmlHQTFLVjRyajlsbytSKyt2eDVFaVB0TXgwWFRCVlhuWW5ObHowVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNis1aHdDbmQyYm1YQThRdTl3ODZYMy85TWdaZ3Q1WUtyc2VVZzZyRVZCbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRRElDV2VqOUlFUzVNZ09XcUphQ1cxejJidEl5WGlLSVZaRE9BK2F2R0hjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUSlkrOFJzb3FkNno5UFlQT1dYb0h2VG5yT2M3cUdQbFlBanBUZmNkM0VnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBKRExETXg0RE14OGNscDF3aU9TVWsyQ3lDbFRtZUo2dmNBNWhvbnJIVzQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNBNDl2TWY3SFFuL2Q1THl6Zm5hV2NBYXZ0Rkoydld6TWQrcEtIeFJ3V2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0gvUFZ2eXhsZUFTbm03MGlVMTduZ0pGcU1QcHBJWWV3Ym5pdEZ5eGMzOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTjhXbkkyTGRKdDA5YVpDWTBMUm44UjBVTHlaZlp1WE5ubGl5Y3pRdUl5ND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJ4TzFKU29wUDZaVFVHSXZnREZaSDgxSGlFSWg3cHcwa1R5RXQ1bXFvWjlNU2F0aXQveDJaay9zM1BYRnN1VG9sZWxNYlRNVUIzVVY1bk9CcDBGdmlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA1LCJhZHZTZWNyZXRLZXkiOiJwZDFNN1gzbDRnL3IzZ0VNczRmNllrL0dMcDBCaS9yRjJnSTFnU256Vm9zPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJqcW83b3NacFRVMmk0S2RNdDE5b0xBIiwicGhvbmVJZCI6ImYwNTQxNDY5LTEzMGQtNGE3NC05NjZiLTUxNGEzYzA0MzRkZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOdmV1Z2hVRzd3bmpJZWw3SDMwZHVjWlB1VFk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVmRMRUlsd09NN1VRVEtvcWtTOXR4TkFHYlk0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjI1VFZROEFHIiwibWUiOnsiaWQiOiIyNTQ3OTk0MTQyNDY6OTJAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xDL29Ic1E5Slg2dXdZWUFTQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ilh0M0xoUkk2UWpVT3BLdUhYUG9vZ2RmaTFmNUorNzlaYzNHT1Y3SVVlRXc9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImU3R1E0c1JOUFV3RkhoVkszdCt1TWNKRU40REtoZ3hvVlF3Vk1MNXpYOFB3RUJhbEdkOE5JdXhaeFNoY3J1aG9aUlpGSkR5Z3FLd0xTU1VjTmlJZUFnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ3Z1BEMElWaHJqWkJ2eGgzaEZISFdsNkpKSTNoejB3Y3hjTE5FdEs1MG9icmpScWRDM2JBWHoyNVI2NlQzazdEZms0Z1ljVTd2ZEhXUzY2TDVwWitnQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc5OTQxNDI0Njo5MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWN2R5NFVTT2tJMURxU3JoMXo2S0lIWDR0WCtTZnUvV1hOeGpsZXlGSGhNIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM2MzQ2MzcwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUxxWiJ9',
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
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
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
