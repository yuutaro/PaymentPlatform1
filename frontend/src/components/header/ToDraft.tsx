import Link from 'next/link'
import Image from '../../../node_modules/next/image'

const ToDraft = () => {
  return (
    <>
      <Link href={process.env.NEXT_PUBLIC_BACK + '/items/new'}>
        <button className="btn btn-ghost btn-circle">
          <Image
            src="/menu_icon/draft.png"
            width={100}
            height={100}
            alt="default"
          />
        </button>
      </Link>
    </>
  )
}

export default ToDraft
