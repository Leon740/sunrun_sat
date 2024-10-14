import logoLight from '@/assets/images/logo/logo_light.svg';
import logoDark from '@/assets/images/logo/logo_dark.svg';
import { Icon, Img } from '@/components';
import { useEmployeeContext, useThemeContext } from '@/contexts';
import { NavLink } from 'react-router-dom';
import { routes } from '@/constants';

export function Header() {
  // employeeContext
  const { employee } = useEmployeeContext();
  const isSignedIn = !!employee._id;

  // colorContext
  const { isLight } = useThemeContext();

  return (
    <header>
      <div className="container">
        <nav
          className={`pt-32 pb-64 flex items-center ${
            isSignedIn ? 'justify-between' : 'justify-center'
          }`}
        >
          {isSignedIn && (
            <NavLink
              to={routes.calendar}
              className={({ isActive }) =>
                isActive ? (isLight ? 'text-dark_navy' : 'text-sky_blue') : 'text-light_navy'
              }
            >
              <Icon icon="calendar" size={'text-24'} />
            </NavLink>
          )}

          <Img src={isLight ? logoLight : logoDark} parentClassName="w-128" />

          {isSignedIn && (
            <NavLink
              to={routes.profile}
              className={({ isActive }) =>
                isActive ? (isLight ? 'text-dark_navy' : 'text-sky_blue') : 'text-light_navy'
              }
            >
              <Icon icon="profile" size={'text-24'} />
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
