export interface User {
    _id: string
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    role: 'admin' | 'user'
    gender: 'male' | 'female'
    createdAt?: string
    updatedAt?: string
}