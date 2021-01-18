import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <footer>
        Alex Welcing{' '}
        <img src="/aw.svg" alt="Alex Welcing logo" className="logo" />
         deployed on Netlify.
          <Link href="/policy">
         <a>tracking policy.</a>
       </Link>
      </footer>
      <style jsx>{`
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .logo {
          height: 1em;
          margin: 5px;
        }
      `}</style>
    </>
  )
}
