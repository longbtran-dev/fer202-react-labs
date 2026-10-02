import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

// Custom hook tạo một API dùng chung để consumer không phải import cả Context
// lẫn useContext, đồng thời báo lỗi rõ ràng nếu thiếu Provider.
export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
