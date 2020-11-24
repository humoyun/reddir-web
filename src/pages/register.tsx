import React from 'react'
import { Formik, Form } from 'formik'
import {
  Box,
  Button,
  Flex,
  Link,
  Text
} from '@chakra-ui/core'
import { BodyWrapper } from '@/components/BodyWrapper'
import { InputField } from '@/components/InputField'
import { useRouter } from 'next/router'
import { useRegisterMutation } from '@/generated/graphql'
import { toErrorMap } from '@/utils/errorMapper'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '@/utils/createUrqlClient'

interface registerProps {
  dummy?: string
}

const Register: React.FC<registerProps> = ({ }) => {
  const router = useRouter()
  const [, register] = useRegisterMutation()

  return (
    <BodyWrapper variant="small">
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          console.log('values ', values)
          const resp = await register({ options: values })
          if (resp.data?.register.errors) {
            setErrors(toErrorMap(resp.data?.register.errors))
          } else if (resp.data?.register.user) {
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              type="text"
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField type="email" name="email" placeholder="email" label="Email" />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>


            <Flex alignItems="center" flexDirection="column" my={4}>
              <Button
                w="100%"
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                Register
              </Button>
  
              <Text fontSize="md" color="gray.500" mt={4}>
                Already have account? {'  '}
                <Link color="teal.900" href="/login">
                  Login
                </Link>
              </Text>
            </Flex>

          </Form>
        )}
      </Formik>
    </BodyWrapper>
  )
}

export default withUrqlClient(createUrqlClient)(Register)