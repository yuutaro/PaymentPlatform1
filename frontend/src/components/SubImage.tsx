const SubImage = (props: { n: string }) => {
  return (
    <>
      <div className="w-[125px] h-[125px] object-center flex items-center justify-center ">
        <img
          src={props.n}
          alt={`画像`}
          className="w-[120px] h-[120px] object-cover "
        />
      </div>
    </>
  )
}

export default SubImage
