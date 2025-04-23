import { Button } from '@chakra-ui/react'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Button colorScheme='blue'>Button</Button>
  )
}

export default App
