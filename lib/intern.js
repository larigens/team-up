class intern extends employee {
    constructor(school) {
        this.school = school;
        this.getSchool = () => {
            if (this.school !== null) {
                console.log(this.school)
            }
        }
        this.getRole = () => {
            console.log("Intern")
        }
    }
    super(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
}

module.exports = intern;