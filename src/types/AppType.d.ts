export interface User {
  _id: string;
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: 'admin' | 'user';
  gender: 'male' | 'female';
  createdAt?: string;
  updatedAt?: string;
}

export interface Overview {
  _id: string;
  name: string; //education name
  type: string; // education type like:...
  method: string; // education  like:...
  degree: string; // education degree
  major: string;
  availableYear: number;
  credits: number;
  duration: number;
  goals?: string; //program goals
  prospectAfterGraduation?: string;
  perspectives?: string;
  createdAt?: string;
  updatedAt?: string;
  listIdUserEdited?: string[];
}

export interface Enrollment {
  _id: string;
  title: string;
  content: string;
}

export interface GeneralKnowledge {
  _id: string;
  title: string;
}

export interface GraduationCondition {
  _id: string;
  title: string;
  content: string;
  idOverView: string;
}

export interface ReferenceDocument {
  _id: string;
  title: string;
  domesticContent: string;
  nonDomesticContent: string;
}

export interface Regulation {
  _id: string;
  title: string;
  content: string;
}

export interface OutputStandard {
  _id: string;
  title: string;
  content: string;
}

export interface OutputType {
  _id: string;
  title: string;
}
