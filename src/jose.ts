import * as jose from "jose"

const AWS_REGION = process.env.AWS_REGION_COGNITO
const USERPOOL = process.env.AWS_COGNITO_USERPOOL

const JWKS = jose.createRemoteJWKSet(
  new URL(
    `https://cognito-idp.${AWS_REGION}.amazonaws.com/${USERPOOL}/.well-known/jwks.json`
  )
)

export async function verifyToken(token: string): Promise<jose.JWTPayload> {
  const { payload } = await jose.jwtVerify(token, JWKS).catch(async (error) => {
    throw error
  })

  return payload
}
