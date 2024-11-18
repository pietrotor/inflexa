import { routerManager } from '@/routes';
import { AdminRoutesEnum } from '@/utils';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="w-full py-4 px-5 bg-primary text-white">
      <Link
        to={{
          pathname: routerManager.getUrl({
            name: AdminRoutesEnum.ADMIN,
          }),
        }}
      >
        <img src="/assets/images/business/logo-sie.png" className="h-9" />
      </Link>
    </div>
  );
};

export { Header };
