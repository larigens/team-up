class manager extends employee {
    constructor(officeNumber) {
        this.officeNumber = officeNumber;
        this.getRole = () => {
            console.log("Manager")
        }
    }
    super(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
}

module.exports = manager;