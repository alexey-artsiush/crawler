module.exports = class UserDto {
    id;
    role;
    firstName;
    lastName
    email;
    password;
    city;
    sex;
    img;
    phone;
    isActivated;
    activationLink;

    constructor(model) {
        this.id = model.id;
        this.role = model.role;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.email = model.email;
        this.password = model.password;
        this.city = model.city;
        this.sex = model.sex;
        this.img = model.img;
        this.phone = model.phone;
        this.isActivated = model.isActivated;
        this.activationLink = model.activationLink;
    }
}
