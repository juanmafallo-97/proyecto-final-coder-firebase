const admin = require("firebase-admin");

const serviceAccount = require("./fir-coder-28584-firebase-adminsdk-1y30q-5d5820f340.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log("Conexión con Firebase exitosa");
} catch (error) {
  console.log("Error al conectar con Firebase: ", error);
}

const db = admin.firestore();

module.exports = db;
