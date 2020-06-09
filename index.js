var inq = require("inquirer");
var axios = require("axios");
var fs = require("fs");
var template = require("./template");

// inq
//   .prompt([
//     {
//       type: "input",
//       name: "q1",
//       message: "Enter your Github Username",
//     },
//   ])
//   .then(function (answers) {
//     return axios.get("https://api.github.com/users/" + answers.q1);
//   })
//   .then(function (response) {
//     var mdFile = response;
//     console.log(mdFile);

//     mdFile = "# Readme for Github Username: " + response.data.login + template;
//     fs.writeFile("./README.md", mdFile, function () {
//       console.log("readme created!");
//     });
//   });

async function getUserInfo() {
  let { projName } = await inquirer.prompt({
    messgae: "what is your project's name?",
    name: "projName",
    type: "input",
  });

  let { projDescription } = await inquirer.prompt({
    message: "Please provide a short description of your project",
    name: "projDescription",
    type: "input",
  });

  let { install } = await inquirer.prompt({
    message: "What should the user do to install the app?",
    name: "install",
    type: "input",
  });

  let { usage } = await inquirer.prompt({
    message: "What should the user know before using the app?",
    name: "usage",
    type: "input",
  });

  let { projLicense } = await inquirer.prompt({
    message: "What kind of license should your project have?",
    name: "projLicense",
    type: "input",
  });

  let { dependencies } = await inquirer.prompt({
    message: "Does the user need to install any deoendencies?",
    name: "dependencies",
    type: "input",
  });

  let { tests } = await inquirer.prompt({
    message: "What coomand should be run to run tests?",
    name: "tests",
    type: "input",
  });
  // let { image } = await inquirer.prompt({
  //   message: "What's your linkedIn?",
  //   name: "image",
  //   type: "input"
  // });

  inquirer
    .prompt({
      message: "Enter your GitHub username:",
      name: "userName",
    })
    .then(function ({ userName }) {
      const queryUrl = `https://api.github.com/users/${userName}/repos?per_page=100`;

      axios.get(queryUrl).then(function (res) {
        const image = res.data[0].owner.avatar_url;
        createReadMe(
          userName,
          projName,
          projDescription,
          install,
          usage,
          projLicense,
          dependencies,
          tests,
          image
        );
      });
    });
}

// function createReadMe(
//   userName,
//   projName,
//   projDescription,
//   install,
//   usage,
//   projLicense,
//   dependencies,
//   tests,
//   image
// ) {
//   let userInfo = `
//   # ${projName}
//     \n \n [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
//   \n \n ## Description \n \n
//   ${projDescription} \n \n
//   ## Table of Contents

//   \*[Installations](#instalations)

//   \*[Usage](#usage)

//   \*[Dependencies](#dependencies)

//   \*[Tests](#tests)

//   \*[Questions](#questions)\n

//   ## Installation
//   ${install}

//   ## Usage
//   ${usage}
//   ## Dependencies
//   ${dependencies}

//   ## License
//   ${projLicense}
//   ## Tests
//   ${tests}

//   ## Questions

//   ![Markdown Logo](${image})

//   If you have questions, please contact me via
//   [GitHub](https//:github.com/${userName} "GitHub")`;

//   fs.writeFile("README.md", userInfo, function(err) {
//     if (err) throw err;
//     console.log("File Created!");
//   });
// }

getUserInfo();
