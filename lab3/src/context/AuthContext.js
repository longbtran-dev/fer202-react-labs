import { createContext } from 'react';

// Context là kênh truyền value từ Provider xuống descendants, không tự tạo state.
// Giá trị mặc định null giúp custom hook phát hiện trường hợp quên bọc Provider.
const AuthContext = createContext(null);

export default AuthContext;
