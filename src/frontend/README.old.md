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