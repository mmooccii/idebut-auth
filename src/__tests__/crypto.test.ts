import "dotenv/config"

import { encryptData, decryptData } from "../crypto"

test("basic", () => {
  expect(decryptData(encryptData("abcdefg"))).toBe("abcdefg")
})
