const sequelize = require('../settings/db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    firstName: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    city: {type: DataTypes.STRING},
    sex: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING}, 
    phone: {type: DataTypes.STRING}, 
})

const Apartment = sequelize.define('apartment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    square: {type: DataTypes.INTEGER, allowNull: false},
    leavingRoom: {type: DataTypes.INTEGER, allowNull: false},
    metro: {type: DataTypes.STRING, defaultValue: "-"},
    parkingSpace: {type: DataTypes.STRING},
    yearBuilt: {type: DataTypes.INTEGER}, 
    bathroom: {type: DataTypes.INTEGER},
    address: {type: DataTypes.STRING},
    rentalPeriod: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING(2500)},
    floor: {type: DataTypes.STRING},
    location: {type: DataTypes.STRING},
    userId: {type: DataTypes.INTEGER, allowNull: false},
    premium: {type: DataTypes.BOOLEAN},
    ownerName: {type: DataTypes.STRING},
    ownerPhone: {type: DataTypes.STRING},
    ownerImage: {type: DataTypes.STRING}, 
})


const City = sequelize.define('city', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    city: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, allowNull: false},
})

const News = sequelize.define('news', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING(2500), allowNull: false},
    shortDescription: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, allowNull: false},
    tags: {type: DataTypes.STRING},
    userId: {type: DataTypes.INTEGER}
})

const Photo = sequelize.define('photo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    apartmentId: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
})

User.hasMany(Apartment)
Apartment.belongsTo(User)

Apartment.hasMany(Photo)
Photo.belongsTo(Apartment)

module.exports = {
    User,
    Apartment,
    City,
    News,
    Photo,
}
