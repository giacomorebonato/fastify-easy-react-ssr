import { Route, Routes, Link } from 'react-router-dom'

const NavLinks = () => (
  <nav className='w-full grid grid-flow-row grid-cols-3 text-center'>
    <Link className='flex-1' to='/'>Home</Link>
    <Link to='/about'>About</Link>
    <Link to='/not-existing'>Not existing route</Link>
  </nav>
)

const Home = () => {
  return <><h1 className='text-center mb-3'>Home</h1><NavLinks /></>
}
const About = () => {
  return <><h1 className='text-center mb-3'>About</h1><NavLinks /></>
}
const NotFound = () => {
  return <><h1 className='text-center mb-3'>Not found</h1><NavLinks /></>
}

export const Pages = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/about' element={<About />} />
			<Route path='/not-found' element={<NotFound />} />
      <Route path='*' element={<NotFound />} />
		</Routes>
	)
}