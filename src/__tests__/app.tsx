import React from 'react'
import { Route, Routes } from 'react-router-dom'

const Home = () => <h1>Home</h1>
const About = () => <h1>About</h1>
const NotFound = () => <h1>Not found</h1>

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/not-found" element={<NotFound />} />
    </Routes>
  )
}
