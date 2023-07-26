function HeroInput() {
  return (
    <div className="flex justify-center items-center drop-shadow-md">
      <div>
        <input
          type="text"
          id="email"
          name="email"
          className="w-64 bg-gray-100 border-none focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-2 leading-8 transition-colors duration-200 ease-in-out rounded-tl-md rounded-bl-md placeholder:text-blue-gray-700"
          placeholder="Search"
        />
      </div>
      <button
        type="button"
        className="py-2 px-2 md:block bg-purple-500 font-semibold text-white hover:text-white hover:bg-purple-700 rounded-br-md rounded-tr-md transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-search"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="10" cy="10" r="7" />
          <line x1="21" y1="21" x2="15" y2="15" />
        </svg>
      </button>
    </div>
  );
}

export default HeroInput;
