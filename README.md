<h1>MyWallet</h1>

<img src='./src/assets/images/mywallet.gif' alt='Gif showing how to use MyWallet' align='right' style='margin-left: 25px;' />

MyWallet is an app that helps you organize your finances.

You can start getting your control over your money back right now! Test it here: https://mywallet-front-end.vercel.app/

<h2>Contents</h2>

- <a href="#about">About</a>
- <a href="#tech">Technologies</a>
- <a href="#reqs">Requirements</a>
- <a href="#run">How to run</a>

<h2 id="about">About</h2>

MyWallet is a web application that you can use to manage your finances.

It allows you to:

- Create an account
- Log into a created account
- Log income and expenses
- Review list of incomes and expenses
- Check out how much money (or debt) you currently have
- Log out to keep your data safe

This app can help you understand your expenditure patterns. Therefore, it can also allow you to notice if you could make better use of your hard-earned money.

<h2 id="tech">Technologies</h2>

- Javascript
- Node.js
- Express
- Axios
- Husky
- Jest
- Supertest
- Dotenv
- Postgres
- Joi

<h2 id="reqs">Requirements</h2>

In order to run this project, you must have _npm_ installed.

<h3>Windows</h3>

If you use Microsoft Windows, you can download it from here and run it to install: https://nodejs.org/dist/v16.13.0/node-v16.13.0-x86.msi

<h3>Linux</h3>

However, if you use Linux, you can do so by following the tutorial below.

1. **Open your terminal and run one of these commands.**

Their structure varies according to the distro you are using.

Ubuntu:

```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

If the command above does not work, try this one:

```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

2. **Close and reopen the terminal before running the following lines:**

```
nvm install --lts
nvm use --lts
```

3. **In case you need extra help:**

You can refer to the official documentation here: https://github.com/nvm-sh/nvm

4. **You are ready to go!**

<h2 id="run">How To Run</h2>

Some steps are necessary for this project to run as it should in your machine.

1. **Clone this repository:**

You can clone this repository by copy this link:

<img src='./src/assets/images/back-clone.gif' alt="Gif showing how to copy this repository's clone link" />

Then you open your terminal and run:

```
git clone https://github.com/andrezzasouza/MyWallet_Back-end.git
```

2. **Clone the front-end repository:**

As this project consists of both front and back-end, you will need to clone the front-end repository as well.

It can be done here: https://github.com/andrezzasouza/MyWallet_Front-end

3. **Configure the front-end:**

You can find the instructions on the link above.

4. **Install dependencies:**

Open your prefered terminal and run this command to install the dependencies:

```
  npm i
```

5. **Explore MyWallet:**

In order to run MyWallet and get to explore it, you must run this command on your terminal:

```
  npm start
```

Development:

```
  npm run start:dev
```

Test:

```
  npm test
```

Watch All Test:

```
npm run test:watch
```
