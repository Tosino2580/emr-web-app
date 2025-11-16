/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 16/11/2025 - 13:37:32
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
// src/components/layout/Container.jsx

export default function Container({ children, className = "" }) {
  return (
    <div className={`max-w-6xl mx-auto px-6 ${className}`}>
      {children}
    </div>
  );
}
