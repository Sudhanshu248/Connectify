import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="prefetch" href="/static/css/app/profile/page.css" />       
                <link rel="stylesheet" href="/static/css/app/profile/page.css" />
            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}