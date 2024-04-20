import { NAVIGATION } from '../../../constants/constants';

export default function Header() {
  return (
    <header className="bg-indigo-600 text-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Brightwheel</span>
          <img
            className="h-8 w-auto"
            src="https://mybrightwheel.com/wp-content/themes/_brightwheel/img/brightwheel-logo-white.svg"
            alt="Logo Brightwheel"
          />
        </a>
        <div className="hidden lg:flex lg:gap-x-12">
          {NAVIGATION.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-white p-3"
            >
              {item.name}
            </a>
          ))}
          <a
            href="https://schools.mybrightwheel.com/sign-in"
            className="text-sm font-semibold leading-6 text-white border p-3 rounded-md"
          >
            Log in
          </a>
        </div>
      </nav>
    </header>
  );
}
