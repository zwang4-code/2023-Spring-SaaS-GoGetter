db = db.getSiblingDB('gogetter')

//GOALS COLLECTION
db.createCollection('goals')
goalsCollection = db.getCollection("goals")
goalsCollection.remove({})
goalsCollection.insert(
{
	goalId: "1",
	title: "Intermittent Fasting",
	description: "Follow 16:8 fasting rule for 30 days",
	userId: "1",
	startDate: new Date("2023-03-25"),
	endDate: new Date("2023-04-25"),
	category: "Health",
	progress: "Not Started",
	reminder: false,
}
)
goalsCollection.insert(
{
	goalId: "2",
	title: "Learn typescript",
	description: "Follow typescript course on courseera",
	userId: "1",
	startDate: new Date("2023-04-15"),
	endDate: new Date("2023-05-15"),
	category: "Career",
	progress: "Not Started",
	reminder: false,
}
)

goalsCollection.insert(
{
    goalId: "3",
    title: "Trekking",
    description: "Take lessons on trekking dos and donts",
    userId: "1",
    startDate: new Date("2023-05-07"),
    endDate: new Date("2023-06-07"),
    category: "Travel",
    progress: "Not Started",
    reminder: false,
}
)

goalsCollection.insert(
{
    goalId: "4",
    title: "Eat more protein",
    description: "intake vegan protein",
    userId: "2",
    startDate: new Date("2023-05-20"),
    endDate: new Date("2023-06-20"),
    category: "Health",
    progress: "Not Started",
    reminder: false,
}
)

//USERS COLLECTION
db.createCollection('users')
usersCollection = db.getCollection("users")
usersCollection.remove({})
usersCollection.insert({
    userId: "1",
    name: "Preedhi",
    email: "preedhigarg@gmail.com",
    goalList : [
        {
            goalId: "1"
        },
        {
            goalId: "2"
        },
        {
            goalId: "3"
        }
       ],
    favoriteView: "Category"
}
)

usersCollection.insert({
    userId: "2",
    name: "Zi",
    email: "zi@gmail.com",
    goalList : [
        {
            goalId: "4"
        },
        {
            goalId: "5"
        },
        {
            goalId: "6"
        }
       ],
    favoriteView: "Category"
})

//REMINDERS COLLECTION
db.createCollection('reminders')
reminderCollection = db.getCollection("reminders")
reminderCollection.remove({})
reminderCollection.insert({
    reminderId:"1",
    goalId: "1",
    userId: "1",
    message: "Do not forget to fast" ,
    reminderDate: new Date("2023-04-20")
})

reminderCollection.insert({
    reminderId:"2",
    goalId: "2",
    userId: "1",
    message: "Complete your typescript lesson" ,
    reminderDate: new Date("2023-05-10")
})
