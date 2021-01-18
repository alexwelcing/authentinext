import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import netlifyAuth from '../netlifyAuth.js'

import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated)

  useEffect(() => {
    let isCurrent = true
    netlifyAuth.initialize((user) => {
      if (isCurrent) {
        setLoggedIn(!!user)
      }
    })

    return () => {
      isCurrent = false
    }
  }, [])

  let login = () => {
    netlifyAuth.authenticate((user) => {
      setLoggedIn(!!user)
    })
  }

  return (
    <div className="container">
      <Head>
        <title>AlexWelcing.com</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header text={'Free resources.'} />
        <p className="description">
          This requires no authentication.
        </p>
        <Image
        src="/policegetawaywithmurder.jpg"
        alt="Breonna Taylor was murdered. George Floyd was murdered."
        width={3089}
        height={2048}
      />
        {loggedIn ? (
          <div>
            If you are already a member, you may also visit{' '}
            <Link href="/protected">
              <a>subscription content.</a>
            </Link>
          </div>
        ) : (
          <button onClick={login}>You do not have a membership yet, please join here.</button>
        )}
      </main>

      <Footer />

      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-family: Menlo, Monaco, Lucida Console, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
            Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
