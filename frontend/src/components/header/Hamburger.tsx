const Hamburger = () => {
  return (
    <>
      <div className="drawer">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle " />
        <div>
          <label htmlFor="my-drawer-2" className="btn drawer-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div className="drawer-side mt-16">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 z-10">
            {/* Sidebar content here */}
            <li>
              <a className="text-zinc-800 text-[20px] mt-4">作品を出品</a>
            </li>
            <li>
              <a className="ml-4">絵画 Painting</a>
            </li>
            <li>
              <a className="ml-4">彫刻 Sculpture</a>
            </li>
            <li>
              <a className="ml-4">版画 Printmaking</a>
            </li>
            <li>
              <a className="ml-4">写真 Photography</a>
            </li>

            <li>
              <a className="text-zinc-800 text-[20px] mt-4">作品を探す</a>
            </li>
            <li>
              <a className="ml-4">絵画 Painting</a>
            </li>
            <li>
              <a className="ml-4">彫刻 Sculpture</a>
            </li>
            <li>
              <a className="ml-4">版画 Printmaking</a>
            </li>
            <li>
              <a className="ml-4">写真 Photography</a>
            </li>

            <li>
              <a className="text-zinc-800 text-[20px] mt-4">
                アーティストを探す
              </a>
            </li>
            <li>
              <a className="ml-4">絵画 Painting</a>
            </li>
            <li>
              <a className="ml-4">彫刻 Sculpture</a>
            </li>
            <li>
              <a className="ml-4">版画 Printmaking</a>
            </li>
            <li>
              <a className="ml-4">写真 Photography</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Hamburger
