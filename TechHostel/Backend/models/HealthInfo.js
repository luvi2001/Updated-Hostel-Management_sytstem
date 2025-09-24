const mongoose = require("mongoose");
const crypto = require("crypto");

const ENCRYPTION_KEY = process.env.HEALTHINFO_KEY || "12345678901234567890123456789012"; // 32 chars
const IV_LENGTH = 16;

function encrypt(text) {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(text) {
  let parts = text.split(":");
  let iv = Buffer.from(parts[0], "hex");
  let encryptedText = Buffer.from(parts[1], "hex");
  let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

const healthInfoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true, get: decrypt, set: encrypt },
    category: { type: String, required: true },
    //author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true }
  }
);

module.exports = mongoose.model("HealthInfo", healthInfoSchema, "healthInfos");
