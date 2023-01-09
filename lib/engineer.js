class engineer extends employee {
    constructor(github) {
        this.github = github;
        this.getGithub = () => {
            if (this.github !== null) {
                console.log(this.github)
            }
        }
        this.getRole = () => {
            console.log("Engineer")
        }
    }
    super(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
}

module.exports = engineer;