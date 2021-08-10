export interface Dummy {
  input: string
}

export const dummy = ({ input }: Dummy) => {
  console.log(input)
}
