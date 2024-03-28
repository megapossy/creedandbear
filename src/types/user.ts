import { z } from 'zod'

const imgTypes = ['apng', 'avif', 'gif', 'jpeg', 'jpg', 'png', 'svg', 'webp', 'bmp', 'ico', 'tiff']

const user = {
  id: z.number({
    invalid_type_error: 'Invalid ID!'
  }),
  email: z
    .string()
    .trim()
    .email({
      message: 'Email is invalid!'
    })
    .min(9, {
      message: 'Email is less than 9 characters!'
    }),
  first_name: z.string().trim().min(3, {
    message: 'First name is less than 3 characters!'
  }),
  last_name: z.string().trim().min(3, {
    message: 'Last name is less than 3 characters!'
  }),
  avatar: z
    .string()
    .trim()
    .min(3, {
      message: 'Invalid Avatar!'
    })
    .refine(
      (val) => {
        try {
          const valArr = val.split('.')
          const ext = valArr[val.length - 1]?.toLowerCase() || ''
          return imgTypes.includes(ext)
        } catch (error) {
          return false
        }
      },
      {
        message: 'Invalid Avatar!'
      }
    )
}

export const CreateUserSchema = z.object({
  email: user.email,
  first_name: user.first_name,
  last_name: user.last_name
})
export type CreateUserType = z.infer<typeof CreateUserSchema>
export type FlattenedCreateUserErrors = z.inferFlattenedErrors<typeof CreateUserSchema>;

export const EditUserSchema = z.object({
  email: user.email.optional(),
  first_name: user.first_name.optional(),
  last_name: user.last_name.optional()
})
export type EditUserType = z.infer<typeof EditUserSchema>
export type FlattenedEditUserErrors = z.inferFlattenedErrors<typeof EditUserSchema>;


export const UserSchema = z.object(user)
export type UserType = z.infer<typeof UserSchema>

export const UsersSchema = z.array(UserSchema)
export type UsersType = z.infer<typeof UsersSchema>



