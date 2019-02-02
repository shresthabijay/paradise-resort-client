import axios from "axios"
const endpoint="http://localhost:7000"

let token=sessionStorage.getItem("paradise-admin-token")

if(token){
    axios.defaults.headers.common['x-access-token']=token
}

export const getAllRooms= async function(){
    let url=endpoint+"/rooms/get/roomdata"
    return axios.get(url)
}

export const getAllRoomTypes= async function(){
    let url=endpoint+"/rooms/get/roomtypes"
    return axios.get(url)
}

export const addRoom= async function(data){
    let url=endpoint+"/rooms/add/room"
    return axios.post(url,data)
}

export const updateRoom=async function(data){
    let url=endpoint+"/update/room"
    return axios.post(url,data)
}

export const addRoomType= async function(data){
    let url=endpoint+"/rooms/add/roomtype"
    return axios.post(url,data)
}

export const getEvents= async function(){
    let url=endpoint+"/eventapi/get/all"
    return axios.get(url)
}

export const addEvent= async function(data){
    let url=endpoint+"/eventapi/add"
    return axios.post(url,data)
}

export const getBooking= async function(){
    let url=endpoint+"/bookings/get/all"
    return axios.get(url)
}

export const addBooking= async function(data){
    let url=endpoint+"/bookings/add"
    return axios.post(url,data)
}

export const updateBooking= async function(data){
    let url=endpoint+"/bookings/update"
    return axios.post(url,data)
}

export const getRoomsByType= async function(data){
    let url=endpoint+"/rooms/search/roomtypeid"
    return axios.post(url,data)
}

export const getRoomCategories= async function(data){
    let url=endpoint+"/rooms/getRoomCategories"
    return axios.get(url)
}

export const getRoomTypeFromCategory= async function(data){
    let url=endpoint+"/rooms/getRoomTypesByCategory"
    return axios.post(url,data)
}

export const authenticateAdmin= async function(token){
    let url=endpoint+"/authenticate/admin"
    return axios.post(url,{},{
        headers:{
            "x-access-token":token
        }
    })
}

export const adminLogin= async function(data){
    let url=endpoint+"/authenticate/login"
    return axios.post(url,data)
}

export const bookingWithKhalti= async function(data){
    let url=endpoint+"/bookings/book"
    return axios.post(url,data)
}

export const checkRoomTypeAvailabilty= async function(data){
    let url=endpoint+"/bookings/is-room-available"
    return axios.post(url,data)
}