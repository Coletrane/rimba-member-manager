import App, { Container } from "next/app"
import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import {theme} from "../util/styles"

import withReduxStore from '../store/with-redux-store'
import { Provider } from "react-redux"

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container>
        <MuiThemeProvider theme={createMuiTheme(theme)}>
        <CssBaseline />
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
        </MuiThemeProvider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)