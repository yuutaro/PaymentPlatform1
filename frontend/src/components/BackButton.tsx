import { useRouter } from 'next/router'

const BackButton = () => {
  const router = useRouter()

  //戻るボタン
  const handleBack = () => {
    router.back()
  }
  return (
    <>
      <button
        onClick={handleBack}
        className="ml-12 flex flex-col items-center group absolute top-20 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 200 200"
          className=" drop-shadow-md group-hover:scale-125 duration-500"
        >
          <g transform="translate(-15.823 -265.198)">
            <path
              d="M115.823,265.2a100,100,0,1,0,100,100,100,100,0,0,0-100-100ZM128.5,309.54a10.887,10.887,0,0,1,7.3,19.221l-39.041,33.7,37.433,37.452a10.888,10.888,0,0,1-15.4,15.4L73.084,369.585a10.887,10.887,0,0,1,.578-15.927l47.893-41.373a10.888,10.888,0,0,1,6.943-2.745Z"
              transform="translate(0 0)"
            />
          </g>
        </svg>
        <p className="text-sm text-white opacity-0 group-hover:opacity-100 group-hover:translate-y-[5px] duration-500 transform">
          BACK
        </p>
      </button>
    </>
  )
}

export default BackButton
