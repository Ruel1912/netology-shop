interface Props {
  error: string
}

export const Error = ({ error }: Props) => {
  return (
    <div className='font-bold text-center text-danger'>{error}</div>
  )
}
