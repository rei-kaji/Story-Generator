import Layout from "../components/Layout";
import "../styles/destroy.css";
import { ThemeProvider } from "@mui/material/styles";
import muiTheme from "../styles/theme/theme";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={muiTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
