import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <article className="l-design-widht">
        <div className="card">
          <label className="input">
            <input className="input__field" type="text" placeholder=" " />
            <span className="input__label">Some Fancy Label</span>
          </label>
          <div className="button-group">
            <button>Send</button>
            <button type="reset">Reset</button>
          </div>
        </div>
        <div className="card card--inverted">
          <h2>
            {' '}
            <svg className="icon" aria-hidden="true"></svg>
            Inverted
          </h2>
          <label className="input">
            <input
              className="input__field"
              type="text"
              placeholder=" "
              value="Valuable value"
            />
            <span className="input__label">Some Fancy Label</span>
          </label>

          <div className="button-group">
            <button>Send</button>
            <button type="reset">Reset</button>
          </div>
        </div>
        <div className="card card--accent">
          <h2>
            <svg className="icon" aria-hidden="true"></svg>
            Accent
          </h2>
          <label className="input">
            <input className="input__field" type="text" placeholder=" " />
            <span className="input__label">Some Fancy Label</span>
          </label>

          <div className="button-group">
            <button>Send</button>
            <button type="reset">Reset</button>
          </div>
        </div>

        <div className="card card--inverted">
          <h2>Colors</h2>
          <p>Play around with the colors</p>
          <input type="color" data-color="light" value="#ffffff" />
          <input type="color" data-color="dark" value="#212121" />
          <input type="color" data-color="signal" value="#fab700" />
        </div>
      </article>

      <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
        <symbol id="icon-coffee" viewBox="0 0 20 20">
          <title>icon-coffee</title>
          <path
            fill="currentColor"
            d="M15,17H14V9h3a3,3,0,0,1,3,3h0A5,5,0,0,1,15,17Zm1-6v3.83A3,3,0,0,0,18,12a1,1,0,0,0-1-1Z"
          />
          <rect
            fill="currentColor"
            x="1"
            y="7"
            width="15"
            height="12"
            rx="3"
            ry="3"
          />
          <path
            fill="var(--color-accent)"
            d="M7.07,5.42a5.45,5.45,0,0,1,0-4.85,1,1,0,0,1,1.79.89,3.44,3.44,0,0,0,0,3.06,1,1,0,0,1-1.79.89Z"
          />
          <path
            fill="var(--color-accent)"
            d="M3.07,5.42a5.45,5.45,0,0,1,0-4.85,1,1,0,0,1,1.79.89,3.44,3.44,0,0,0,0,3.06,1,1,0,1,1-1.79.89Z"
          />
          <path
            fill="var(--color-accent)"
            d="M11.07,5.42a5.45,5.45,0,0,1,0-4.85,1,1,0,0,1,1.79.89,3.44,3.44,0,0,0,0,3.06,1,1,0,1,1-1.79.89Z"
          />
        </symbol>
      </svg>
    </div>
  );
};

export default Home;
