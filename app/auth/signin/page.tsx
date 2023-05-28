import getCurrentUser from "@/actions/getCurrentUser"
const SigninPage = async () => {
  const currentUser = await getCurrentUser()
  console.log(currentUser)
  return (
    <div>SigninPage</div>
  )
}

export default SigninPage