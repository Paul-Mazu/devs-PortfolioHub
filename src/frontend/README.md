# Frontend Specific Readme

## Setup:

### Downloading and Installing Node.js and npm:

_Note: It is recommended to use a Node.js version manager, such as [nvm for OSX/Linux](https://github.com/nvm-sh/nvm) or [nvm for Windows](https://github.com/coreybutler/nvm-windows). See the [npm documentation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)._

#### __Ubuntu__:

1. __Installing from Ubuntu Default Software Repository:__
    * simply run the following commands in your terminal:
        * <code>sudo apt update</code>
        * <code>sudo apt install nodejs</code> 
        * <code>sudo apt install npm</code> 
    * this installs the __default version__ as stored on the Ubuntu Repository. You can check your node version by running <code>node -v</code>
2. __Installing a Specific Version from Nodesource:__
    * refer to [Nodesource documentation](https://github.com/nodesource/distributions#installation-instructions)
3. __Installing nvm to Manage Various Versions:__
    * first check if nvm is installed by executing <code>nvm --version</code>
    * execute the following in your terminal:
        * <code>curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash</code>
    * once nvm is installed, you can install Node.js:
        * <code>nvm install node</code> for the most recent version
        * <code>nvm install \<DESIRED NODE VERSION></code> to install a specific version
        * <code>nvm ls</code> to list installed versions
        * <code>nvm run node --version</code> to run a specific Node.js version
    * check the [nvm documentation](https://github.com/nvm-sh/nvm#installing-and-updating) for further information

This should also install npm (Node Package Manager) by default. You can keep npm updated by running <code>npm install -g npm</code>.

### Downloading and Installing React.js:

_Note: Ideally, simply install required dependencies, including the necessary version of React.js, from the_ package.json _file!_

Using npm, we can easily download and install React.js. 

To install React.js, simply run `npm -g install create-react-app`.

To verify the successful installation of React.js, execute `create-react-app --version`.

### Downloading and Installing Other Modules:

It is recommended to install most other modules locally (per directory) and track versions in a _package.json_ file.

When installing a module locally with npm, a _node\_modules_ directory as well as a _package.json_ and a _package-lock.json_ file will be created in the current folder. In case they already exist, the json files will be automatically updated to include the most recent information on project dependencies.

The creation of a React.js project will also create these files and folders and include information on the prerequisite React.js version and other dependencies.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
