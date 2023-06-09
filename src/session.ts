import { createClient } from "redis"
import { v4 as uuidv4 } from "uuid"

const redisServerURL = process.env.REDIS_SERVER_URL

const client = createClient({
  url: redisServerURL,
})

client.on("error", function (err) {
  throw err
})

export function createRedisKey(): string {
  return uuidv4()
}

export async function redisSet(key: string, value: string): Promise<boolean> {
  try {
    await client.connect()
    await client.set(key, value)
    await client.disconnect()
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
