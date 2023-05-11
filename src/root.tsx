// @refresh reload
import { Show, Suspense } from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
  useMatch,
} from "solid-start";
import "./root.css";

export default function Root() {
  const isHome = useMatch(() => "/");
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - With MDX</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <ErrorBoundary>
          {/* <A href="/">Index</A>
          <A href="/about">About</A> */}
          <Show
            when={!isHome()}
            fallback={
              <div
                style={{
                  width: "100%",
                  height: "100vh",
                  display: "flex",
                  "justify-content": "center",
                  "align-items": "center",
                  "flex-direction": "column",
                  padding: "2rem",
                  "box-sizing": "border-box",
                }}
              >
                <img
                  style={{
                    "max-width": "30rem",
                    "margin-bottom": "5rem",
                    width: "calc(100% - 4rem)",
                  }}
                  src="/images/logo.png"
                  alt="andi.dev"
                />
              </div>
            }
          >
            <div class="header">
              <A href="/">
                <img class="logo" src="/images/logo.png" alt="andi.dev" />
              </A>
            </div>
            <Suspense>
              <main>
                <Routes>
                  <FileRoutes />
                </Routes>
              </main>
            </Suspense>
          </Show>
        </ErrorBoundary>
        <Scripts />

        {/* <div class="grain" /> */}
        <div class="grain-light" />
      </Body>
    </Html>
  );
}
