import React from 'react'
import { BodyWrapper } from '../components/BodyWrapper'
import { Box } from '@chakra-ui/core'

interface LayoutProps { 
  variant?: 'small' | 'regular';
  children?: React.ReactChildren 
}

const Layout: React.FC<LayoutProps> = ({ children, variant })=> {
  return (
    <Box className="reddir-app" bg="#f4f5f7" w="100%" h="100%" minH="100vh">
      <BodyWrapper variant={variant}>{children}</BodyWrapper>
    </Box>
  )
}

export default Layout