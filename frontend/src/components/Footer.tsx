import CenterColumn from './footer/CenterColumn'
import LeftColumn from './footer/LeftColumn'
import RightColumn from './footer/RightColumn'

const Footer = () => {
  return (
    <>
      <footer className="footer bg-neutral text-neutral-content p-10 ">
        <LeftColumn />
        <CenterColumn />
        <RightColumn />
      </footer>
    </>
  )
}

export default Footer
