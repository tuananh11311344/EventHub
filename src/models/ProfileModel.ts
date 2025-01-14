export interface ProfileModel{
    uid: string,
    bio: string,
    createdAt: string,
    email: string,
    fullname: string,
    givenName: string,
    familyName: string,
    photoUrl: string,
    following: string[],
    interests?: string[]
}