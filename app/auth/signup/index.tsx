import Image from 'next/image'
import styled from 'styled-components'
import { FaGoogle, FaFacebookF } from 'react-icons/fa'
import BG from '@/assets/svg/authBG.png'

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
`

const Section = styled.div`
  width: 50vw;
  height: 100vh;
`

const SectionContainer = styled(Section)`
  background: #EDEDED;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.4rem;
`;

const Input = styled.input`
  width: 22rem;
  padding: 10px;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  outline: none;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 0.5rem;
  background: #393838;
  color: white;
  cursor: pointer;
`;

const AuthProviderButton = styled.button`
  border-radius: 1rem;
  padding: 10px;
  border: none;
  background-color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 1px 3px 5px grey;
  `;


const SignUp = () => {
  return (
    <PageContainer>
      <Section>
        <SectionContainer style={{ background: "white" }}>
          <div>
            <h1 style={{textAlign: "center", fontSize: "3rem"}}>RENTMEROOM</h1>
            <Image
             alt="rentmeroom"
              src={BG}
              width={500}
              height={250}
            />
          </div>
        </SectionContainer>
      </Section>

      <Section>
        <SectionContainer>
          <FormGroup>
            <Input placeholder="Mobile" />
            <Input placeholder="Password" />
            <Button>Sing Up</Button>

            <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
              <AuthProviderButton>
                <FaGoogle />
                <span style={{ fontSize: "0.85rem" }}>Sign up with Google</span>
              </AuthProviderButton>
              <AuthProviderButton>
                <FaFacebookF />
                <span style={{ fontSize: "0.85rem" }}>Sign up with Facebook</span>
              </AuthProviderButton>
            </div>
          </FormGroup>
        </SectionContainer>
      </Section>
    </PageContainer>
  )
}

export default SignUp