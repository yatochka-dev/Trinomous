import {type AppType} from "next/dist/shared/lib/utils";
import Head from "next/head";
import logo from "@/public/three-fingers.jpg";
import "../styles/globals.css";
import {Footer} from "../components/Footer/Footer";
import {Box, Container} from "@mui/material";

const MyApp: AppType = ({Component, pageProps}) => {
    return (
        <>
            <Head>
                {/*  meta tags og  */}
                <meta property="og:title" content="Trinomous"/>
                <meta property="og:description"
                      content="Find the trinomous of a given b and c"/>
                <meta property="og:locale" content="en_US"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url"
                      content="https://trinomous.vercel.app/"/>
                <meta property="og:site_name" content={"Trinomous calculator"}/>
                <title>Trinomous calculator</title>
                {/*  add icon  */}
                <link rel="icon" href={logo.src}/>


            </Head>
            <Box sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
            }}>
                <Container component={"main"} sx={{
                    flex: "1 1 auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Component {...pageProps} />
                </Container>
                <Footer/>
            </Box>
        </>
    )
};

export default MyApp;
