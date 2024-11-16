import { Link } from "react-router-dom";

const Dropdown = ({ title, submenu }: any) => {
  return (
    <div className="relative inline-block text-left">
      <div className="group">
        <button className="m-0 flex items-center justify-center rounded px-2 text-xl font-semibold text-inherit no-underline hover:border-x-orange-400 hover:bg-white hover:text-orange-400 hover:shadow">
          {title}
          <svg
            className="-mr-1 ml-2 h-5 w-5 transform transition duration-200 ease-in-out group-hover:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className="absolute right-0 hidden min-w-max origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 group-hover:block">
          <div className="py-1" role="menu">
            {submenu?.map((item: any, index: number) => (
              <Link
                key={`${item?.path}_${index}`}
                className="block px-6 py-3 text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                to={item?.path}
              >
                {item?.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
