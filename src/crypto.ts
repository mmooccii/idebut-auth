import {
  scryptSync,
  randomBytes,
  createCipheriv,
  createDecipheriv,
} from "crypto"

const secret: string = process.env.SECURE_AUTH_KEY || "secret"
const salt: string = process.env.AUTH_SALT || "abcdefg"

const algorithm: string = "aes-256-cbc"

export function encryptData(data: string): string {
  const key = scryptSync(secret, salt, 32)
  const iv = randomBytes(16)

  const cipher = createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(data, "utf8", "hex")
  encrypted += cipher.final("hex")

  return `${iv.toString("hex")}:${encrypted}`
}

export function decryptData(encryptedData: string): string {
  const [ivHex, encryptedHex] = encryptedData.split(":")
  const iv = Buffer.from(ivHex, "hex")

  const key = scryptSync(secret, salt, 32)

  const decipher = createDecipheriv(algorithm, key, iv)
  let decrypted = decipher.update(encryptedHex, "hex", "utf8")
  decrypted += decipher.final("utf8")

  return decrypted
}
