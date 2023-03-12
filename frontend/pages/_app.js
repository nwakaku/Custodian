import "../styles/globals.css"
import { publicProvider } from "wagmi/providers/public"
import { lightTheme } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { connectorsForWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { chain, configureChains, createClient, useSigner, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { zkSyncTestnet } from "wagmi/chains"
import { Layout } from "../components/Layout"
import theme from "../constants/Theme"
import createEmotionCache from "../constants/createEmotionCache"
import PropTypes from "prop-types"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import {
    argentWallet,
    injectedWallet,
    rainbowWallet,
    walletConnectWallet,
    metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets"

const clientSideEmotionCache = createEmotionCache()

const { chains, provider } = configureChains(
    [zkSyncTestnet],
    [
        jsonRpcProvider({
            rpc: () => ({ http: "https://zksync2-testnet.zksync.dev	" }),
        }),
        publicProvider(),
    ]
)

const connectors = connectorsForWallets([
    {
        groupName: "Recommended",
        wallets: [
            argentWallet({ chains }),
            injectedWallet({ chains }),
            rainbowWallet({ chains }),
            walletConnectWallet({ chains }),
            metaMaskWallet({ chains }),
        ],
    },
])

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
})

function MyApp(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} theme={lightTheme()}>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, 
                  consistent, and simple baseline to
                  build upon. */}
                    <CssBaseline />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>{" "}
                </ThemeProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    )
}
MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
}

export default MyApp
