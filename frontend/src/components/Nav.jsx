import { useNavigate } from 'react-router-dom';

function Nav() {
  const navigate = useNavigate();
  if (localStorage.getItem('token') === null) {
    return (
      <nav className="bg-[#1A1C20] px-5 w-full h-16 flex justify-between items-center shrink-0 gap-10 mb-10">
        <a
          className="text-[#00D1FF] font-bold text-3xl hover: cursor-pointer"
          onClick={() => navigate('/')}
        >
          Spliteasy
        </a>
        <div className="flex items-center gap-4 p-2 h-full ">
          <button
            className="bg-[#00D1FF] text-gray-700 px-4 py-2 rounded font-bold hover: cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className="bg-[#00FFC2] text-gray-700 px-4 py-2 rounded font-bold hover: cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </nav>
    );
  } else
    return (
      <nav className="bg-[#1A1C20] px-5 w-full h-16 flex justify-between items-center shrink-0 gap-10 mb-10">
        <div className="flex justify-between items-center gap-12 transition-">
          <a
            href="/"
            className="text-[#00D1FF] font-bold text-3xl hover: cursor-pointer"
          >
            Spliteasy
          </a>

          <a
            href="/groups"
            className="text-white  cursor-pointer hover:text-[#00D1FF] transition-colors"
          >
            Grupos
          </a>
        </div>
        <div className="flex items-center gap-4 ">
          <div
            id="search"
            className="flex items-center bg-[#2A2C30] h-10 w-64 border border-gray-700 rounded-md p-4  "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-search text-gray-400 mr-4"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="text-gray-400 bg-transparent focus:outline-none w-full"
            />
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle text-gray-400 mr-4 size-8"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
            </svg>
          </div>
        </div>
      </nav>
    );
}

export default Nav;
