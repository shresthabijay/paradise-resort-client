const routes=[
  {
    name:"Booking",
    link:"/admin/bookings",
    icon:"fas fa-book",
    subItems:[
      {
        name:"Book Lists",
        icon:"fas fa-list-ul",
        link:"/admin/bookings/list"
      }
    ]
  },
  {
    name:"Rooms",
    link:"/admin/rooms",
    icon:"fas fa-users",
    subItems:[
      {
        name:"Manage Rooms",
        icon:"fas fa-plus",
        link:"/admin/rooms/manage"
      },{
        name:"Rooms List",
        icon:"fas fa-list-ul",
        link:"/admin/rooms/list"
      }
    ]
  },
  {
    name:"Events",
    link:"admin/events",
    icon:"fas fa-tags",
    subItems:[
      {
        name:"Add Events",
        link:"/admin/events/add",
        icon:"fas fa-plus"
      },{
        name:"Events List",
        link:"/admin/events/list",
        icon:"fas fa-list-ul"
      }
    ]
  },
  {
    name:"Manage Home Page",
    link:"/admin/manage-page",
    icon:"fas fa-retweet",
    subItems:[
      {
        name:"Manage Offers",
        link:"/admin/manage-page/offers",
        icon:"fas fa-plus"
      },
    ]
  }
]

export default routes
