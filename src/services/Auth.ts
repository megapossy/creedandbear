import { waits } from '@/utils/helpers'
export class Auth {
  static async login(email: string) {
    console.log('Logging In:', email)
    await waits(2000)
  }
}
