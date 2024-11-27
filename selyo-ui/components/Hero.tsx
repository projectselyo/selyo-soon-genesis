import React from "react";
import { Reveal } from "./Animations/Reveal";

function Hero() {
  return (
    <div>
      <section className="video-background flex items-center justify-center min-h-dvh bg-gradient-to-br from-sky-600 to-emerald-300">
        <Reveal>
          <div>
            <div className="text-center flex items-center justify-center">
              <div className="text-5xl font-bold dm-sans text-white leading-snug ">
                Tokenizing Social Interactions
              </div>

              {/* <div className="text-5xl font-bold dm-sans text-white leading-snug w-1/2">
              Platform for tokenizing social interactions. We help organizers gather real-time data from their participants to help them run raffles, giveaways, and help understand attendees behavior to bring the best experience for your in-person events.
              <span className="from-blue-500 to-blue-700 bg-gradient-to-r bg-clip-text text-transparent">
                social interactions &nbsp;
              </span>
              through IoT.
            </div> */}
              {/* <div className="mt-5">
              <Link
                href="/login"
                className="text-xl bg-red-400 hover:bg-red-500 text-white dm-sans font-bold py-2 px-4 rounded transition duration-200 hover:shadow-lg"
              >
                Get Started!
              </Link>
            </div> */}
              {/* <div className="mt-5 text-white flex items-center dm-sans ">
              <span>Powered by &nbsp;</span>
              <div>
                <Image
                  src={"/SolanaLogo.png"}
                  alt={"Solana Logo"}
                  width={100}
                  height={100}
                />
              </div>
            </div> */}
            </div>
            <div className="text-center flex items-center justify-center">
              <div className="text-center text-xl text-white leading-snug w-1/3 items-center justify-center">
                We help organizers gather real-time data from their participants
                to help them run raffles, giveaways, and help understand
                attendees behavior to bring the best experience for your events.
                <br />
                <p className="pt-5">
                  Learn more through our{" "}
                  <a href="https://selyo.gitbook.io/selyo-docs">docs</a>
                </p>
                {/* <p className="pt-5">
                Event goers are given QuestCards - an ATM-sized NFC that serves as your key item
                when going to a Selyo-enabled event.
              </p>
              <p className="pt-5">
                Our PANATAK NFC scanner are distr
              </p> */}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

export default Hero;
