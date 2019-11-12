# GitHub Commits Frontend Test

See it live: http://gh-commits.surge.sh/

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />

### docker

docker build --build-arg gh_token=[your GitHub developer token] . -t gh-commits
docker run -p 8000:80 gh-commits

##
