'use client'
import Header from '../components/Header'
import Hero from '../components/Hero'
import TutorList from '../components/TutorList'
import Testimonials from '../components/Testimonials'
import BecomeTutor from '../components/BecomeTutor'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <TutorList />
      <Testimonials />
      <BecomeTutor />
    </main>
  )
}
