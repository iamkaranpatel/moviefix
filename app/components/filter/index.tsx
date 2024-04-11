import { getAllMovieGenere } from '@/app/utils/endpoint'
import React from 'react'

const Filter = async () => {
  try{
    const genere = await getAllMovieGenere()
    console.log(genere)
  } catch(error) {
    console.log("error", error)
  }
  return (
    <div>Filter</div>
  )
}

export default Filter