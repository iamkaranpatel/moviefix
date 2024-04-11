import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import style from './header.module.css'

const Header = () => {
  return (
    <header className={style.header}>
      <div className="wrapper">
        <Link href='/' title='movieix'>
          <Image 
            width={124}
            height={34}
            src="/moviefix.svg"
            alt='moviefix'
          />
        </Link>
      </div>
    </header>
  )
}

export default Header