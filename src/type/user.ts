export interface User {
  studentId?: number
  username: string
  type: 0 | 1
  name: string
  profileImage: string
}

export enum FaceSignResultType {
  SURE,
  MULTIPLE_POSSIBILITY,
  FAILED,
}
