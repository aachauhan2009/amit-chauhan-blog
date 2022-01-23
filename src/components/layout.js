import React from "react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import DarkMode from "./dark-mode"

class Layout extends React.Component {
  render() {
    const { title, children } = this.props
    const header = (
        <h1
          style={{
            ...scale(0.7),
            marginBottom: rhythm(1.5),
            marginTop: 0,
            color: "var(--textLink)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
          <DarkMode />
        </h1>
      )
  
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>
          {header}
          
        </header>
        <main>{children}</main>
        <footer>
          <a href="https://twitter.com/eramit123456">Twitter</a>
          <span> • </span>
          <a href="https://stackoverflow.com/users/2417295/amit-chauhan">
            Stackoverflow
          </a>
          <span> • </span>
          <a href="https://www.linkedin.com/in/amit-chauhan-ba61151b">
            LinkedIn
          </a>
        </footer>
      </div>
    )
  }
}

export default Layout
