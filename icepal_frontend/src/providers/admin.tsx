import { AdminLayout } from '@/components';
import { Outlet } from 'react-router-dom';

const AdminProvider = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export { AdminProvider };
