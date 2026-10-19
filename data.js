var threads = [
    {
        id: 1,
        title: "Thread 1",
        author: "User",
        content: "Thread content",
        description: "This thread is used for testing purposes",
        comments: [
            {
                author: "Test 1",
                date: Date.now(),
                content: "Hey there"
            },
            {
                author: "Test 2",
                date: Date.now(),
                content: "Woah"
            }
        ]
    },
        {
        id: 2,
        title: "Thread 2",
        author: "User",
        content: "Thread content",
        description: "This thread is also used for testing purposes",
        comments: [
            {
                author: "Test 3",
                date: Date.now(),
                content: "I like this thread"
            },
            {
                author: "Test 4",
                date: Date.now(),
                content: "Me too"
            }
        ]
    }

]

//localStorage.clear();
if (localStorage && localStorage.getItem("threads")) {
    threads = JSON.parse(localStorage.getItem("threads"));
} else {
    localStorage.setItem("threads", JSON.stringify(threads));
}

//hamburger menu
const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");
hamMenu.addEventListener("click", () => {
    hamMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
});