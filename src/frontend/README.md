# Frontend Specific Readme

## Setup:

### Downloading and Installing Node.js and npm:

_Note: It is recommended to use a Node.jsn version manager, such as [nvm for OSX/Linux](https://github.com/nvm-sh/nvm) or [nvm for Windows](https://github.com/coreybutler/nvm-windows). See the [npm documentation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)._

#### __Ubuntu__:

1. __Installing from Ubuntu Default Software Repository:__
    * simply run the following commands in your terminal:
        * <code>sudo apt update</code>
        * <code>sudo apt install nodejs</code> 
        * <code>sudo apt install npm</code> 
    * this installs the __default version__ as stored on the Ubuntu Repository. You can check your node version by running <code>node -v</code>
2. __Installing a specific Version from Nodesource:__
    * refer to [Nodesource documentation](https://github.com/nodesource/distributions#installation-instructions)
3. __Installing nvm to manage various Versions:__
    * first check if nvm is installed by executing <code>nvm --version</code>
    * execute the following in your terminal:
        * <code>curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash</code>
    * once nvm is installed, you can install Node.js:
        * <code>nvm install node</code> for the most recent version
        * <code>nvm install \<DESIRED NODE VERSION></code> to install a specific version
        * <code>nvm ls</code> to list installed versions
        * <code>nvm run node --version</code> to run a specific Node.js version
    * check the [nvm documentation](https://github.com/nvm-sh/nvm#installing-and-updating) for further information