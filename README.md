# GitHub Commits Frontend Test

## Running the app

### Live

You can see it live at [http://gh-commits.surge.sh/](http://gh-commits.surge.sh/).

### Docker

You can download and run a Docker image of the app. You need, of course, Docker. If you don't have Docker yet, you can follow the [Get Started with Docker](https://www.docker.com/get-started) guide.

Pull the docker image:
`docker pull alerizzo/gh-commits:1.0`

Run the docker image:
`docker run -p 8080:80 alerizzo/gh-commits:1.0`

Now you can navigate in your browser to [http://localhost:8080/](http://localhost:8080/) to see the app.

## Working with the app locally

Application was bootstrapped using [`create-react-app`](https://github.com/facebook/create-react-app). That means every command available with `create-react-app` is also available here.

### Cloning the app locally

Start by cloning the repository in your local machine:

```
git clone git@github.com:alerizzo/gh-commits.git
cd gh-commits
```

### Define ENV variables

The application needs a valid GitHub developer token to run. You can find how to get one [here](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line). Then, define an envirionment variable `REACT_APP_GITHUB_TOKEN` with that token. Easiest way to do it is by creating a `.env` file at the app's root folder, with this content:

```
REACT_APP_GITHUB_TOKEN=[your GitHub token here]
```

There's a sample `.env.sample` file for you to complete the token and rename the file.

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.
