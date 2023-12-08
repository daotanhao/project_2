import { useContext } from 'react';
import { AuthContext } from '../misc/providers/AuthProvider';

export const useAuth = () => useContext(AuthContext);
