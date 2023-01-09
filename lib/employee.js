class employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.getName = () => {
            if (this.name !== null) {
                console.log(this.name)
            }
        }
        this.getId = () => {
            if (this.id !== null) {
                console.log(this.id)
            }
        }
        this.getEmail = () => {
            if (this.email !== null) {
                console.log(this.email)
            }
        }
        this.getRole = () => {
            console.log("Employee")
        }
    }
}

module.exports = employee;