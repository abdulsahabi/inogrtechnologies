const admin = require("firebase-admin");
const serviceAccount = require("../service-account-key.json"); // Ensure this file is still there

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const email = "inogrworks@gmail.com"; // <--- Make sure this matches your login EXACTLY

async function checkUser() {
  try {
    const user = await admin.auth().getUserByEmail(email);
    console.log("------------------------------------------------");
    console.log(`User: ${user.email}`);
    console.log(`UID:  ${user.uid}`);
    console.log("Custom Claims:", user.customClaims); // <--- LOOK HERE
    console.log("------------------------------------------------");
    process.exit();
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

checkUser();
