function generateHTML(team) {
    // Creates constant to collect only the role-specific information and store it in an array.
    const managerInfo = team.filter(manager => manager.role === "Manager");
    const engineerInfo = team.filter(engineer => engineer.role === "Engineer");
    const internInfo = team.filter(intern => intern.role === "Intern");

    // Head of HTML file and will add elements according to user input.
    let htmlDraft = `<!DOCTYPE html>
<html lang="en">
    
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Up - Team Profile Generator</title>
    <!-- Boostrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,300;0,400;0,600;0,700;1,500&display=swap" rel="stylesheet">
    <!-- My CSS file -->
    <link rel="stylesheet" href="./style.css" />
    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="./assets/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./assets/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./assets/favicon/favicon-16x16.png">
    <link rel="manifest" href="./assets/favicon/site.webmanifest">
</head>
    
<body>
    <header class="navbar p-4 shadow flex-md-nowrap">
        <img src="./assets/favicon/apple-touch-icon.png" alt="logo" class="ms-2" width="150px" height="150px">
        <h1 class="title ms-1">Team Up!</h1>
    </header>
        
    <div id="dashboard" class="d-flex pt-3 pb-3 flex-wrap justify-content-evenly">\n`

    // Manager Card.
    if (managerInfo !== "") {
        // Since the information is stored in an array, it needs to be mapped to collect the values of the object properties.
        managerInfo.map(manager => {
            htmlDraft += `
        <div class="card m-3" style="width: 22rem; height: 20rem;">
            <h5 class="card-header p-3 text-center">${manager.name}</h5>
            <h5 class="card-title mt-2 me-1 ms-4 pt-3"><span id="icon" class="fa fa-users"></span> ${manager.role}</h5>
            <div class="card-body">
                <p class="card-text m-1 pt-1 pb-3">ID: <span>${manager.id}</span></p>
                <p class="card-text m-1 pt-1 pb-3">Email: <a href="mailto:${manager.email}">${manager.email}</a></p>
                <p class="card-text m-1 pt-1 pb-3">Office Number: <span>${manager.officeNumber}</span></p>
            </div>
        </div>\n`
        })
    }

    // Engineer Card.
    if (engineerInfo !== "") {
        engineerInfo.map(engineers => {
            htmlDraft += `
        <div class="card m-3" style="width: 22rem; height: 20rem;">
            <h5 class="card-header p-3 text-center">${engineers.name}</h5>
            <h5 class="card-title mt-2 me-1 ms-4 pt-3"><span id="icon" class="fa fa-laptop"></span> ${engineers.role}</h5>
            <div class="card-body">
                <p class="card-text m-1 pt-1 pb-3">ID: <span>${engineers.id}</span></p>
                <p class="card-text m-1 pt-1 pb-3">Email: <a href="mailto:${engineers.email}">${engineers.email}</a></p>
                <p class="card-text m-1 pt-1 pb-3">GitHub: <a href="https://github.com/${engineers.github}"> @${engineers.github}</a></p>
            </div>
        </div>\n`
        })
    }

    // Intern Card.
    if (internInfo !== "") {
        internInfo.map(interns => {
            htmlDraft += `
        <div class="card m-3" style="width: 22rem; height: 20rem;">
            <h5 class="card-header p-3 text-center">${interns.name}</h5>
            <h5 class="card-title mt-2 me-1 ms-4 pt-3"><span id="icon" class="fa fa-graduation-cap"></span> ${interns.role}</h5>
            <div class="card-body">
                <p class="card-text m-1 pt-1 pb-3">ID: <span>${interns.id}</span></p>
                <p class="card-text m-1 pt-1 pb-3">Email: <a href="mailto:${interns.email}">${interns.email}</a></p>
                <p class="card-text m-1 pt-1 pb-3">School: <span>${interns.school}</span></p>
            </div>
        </div>\n`
        })
    }

    // Final portion of the HTML file.
    htmlDraft += `
    </div>
</body>

</html>`

    return htmlDraft;
}

module.exports = generateHTML;