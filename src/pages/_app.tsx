import type { AppType } from "next/app";
import { trpc } from "@/utils/trpc";

const App: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(App);
// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }
