import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import Header from '@components/Header'
import Footer from '@components/Footer'

import netlifyAuth from '../netlifyAuth.js'

export default function Protected() {
  let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated)
  let [user, setUser] = useState(null)

  useEffect(() => {
    let isCurrent = true
    netlifyAuth.initialize((user) => {
      if (isCurrent) {
        setLoggedIn(!!user)
        setUser(user)
      }
    })

    return () => {
      isCurrent = false
    }
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Alex Welcing authenticated garden.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loggedIn ? (
        <main>
          <Header text={'Alex Welcing authenticated garden.'} />
          <p className="description">
            Hey, what's good. I see you there {user?.user_metadata.full_name}!
          </p>
          <Image
          src="/twocreatures.jpg"
          alt="These cats protect our household from all evil."
          width={3089}
          height={2048}
        />
          <button
            onClick={() => {
              netlifyAuth.signout(() => {
                setLoggedIn(false)
                setUser(null)
              })
            }}
          >
            Log out.
          </button>
        </main>
      ) : (
        <main>
          <p>You are not logged in yet.</p>
          <Link href="/">
            <a>You have to sign-up for this.</a>
          </Link>
        </main>
      )}

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
