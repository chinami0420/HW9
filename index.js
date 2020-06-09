const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your GitHub user name?",
      name: "user",
    },
    {
      type: "input",
      message: "What is your project's name?",
      name: "project",
    },
    {
      type: "input",
      message: "Please write a short description of your project.",
      name: "description",
    },
    {
      type: "input",
      messgae: "What kind of licsense should your project have?",
      name: "license",
    },
    {
      type: "input",
      message: "What command should be run to install dependencies?",
      name: "dependencies",
    },
  ])
  .then(function (response) {
    const api = `https://api.github.com/users/${response.user}`;
    axios.get(api).then(function () {
      const data = `
# ${response.project}
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)
## Description
${response.description}
## Table of Contents
* [Installation](#Installation)
* [Usage](#Usage)
* [License](#License)
* [Contributing](#Contributing)
* [Questions](#Questions)
## Installation
To install necessary dependencies, run the following command:
${response.dependencies}
## Usage
${response.about}
## License
${response.license}
## Contributing
${response.test}
## Questions


--
If you have any questions about the repo, please contact me at github.com/${response.user} or tajohnsonn@gmail.com.`;

      fs.writeFile("ReadMe.md", data, function () {
        console.log("Successfully wrote to ReadMe.md!");
      });
    });
  });
