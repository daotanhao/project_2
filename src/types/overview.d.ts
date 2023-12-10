export interface Overview {
  _id: string;
  name: string; //education name
  type: 'abc' | 'xyz' | 'tuv'; // education type like:...
  method: 'abc' | 'xyz' | 'tuv'; // education  like:...
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
