export default  [
  {
    type: "story",
    title: "Prologue",
    failText: "The last thing you saw was the boar's tusk ramming in your leg before you fell uncounscious.",
    paragraphs: [
      {
        info: "",
        button: "Wake up",
        hideTitle: true
      },
      {
        info: "You see an unusually long and heavy sword lying next to you.",
        button: "Pick up the sword"
      },
      {
        info: "As you pick it up, you notice from the corner of your eye a wounded boar charging at you.",
        button: "Swing your sword at it",
        battle: {
          health: 10,
          time: 30
        }
      },
      {
        info: "After defeating the boar, you spot a hidden cave nearby that feels safe.",
        button: "Take refuge in the cave"
      },
      {
        info: "You find refuge in the cave.",
        button: "Drift into a deep slumber"
      },
      {
        info: "On waking up your body is still aching all over. You are lying on a makeshift bed made of ferns and twigs, and some kind of ointment has been spread on your wounds. You find a note by your side.",
        button: "Read the note"
      }
    ]
  },
  {
    type: "adventure",
    title: "Beginning of an empire",
    contracts: [
      {
        id: 1,
        title: "Thanks for the boar",
        note: {
          author: "Thomas, the innkeeper",
          contents: "Hey there, thanks for taking care of that boar. You managed to kill it, but looking at you I can tell it didn't give up easy. I guess thanks to all those wars no one has time to get rid of them before they get that big. I found the boar in a nearby clearing and then you in here. I am a bit weary of strangers during this troubled times, but I couldn't leave you by yourself. I patched you up and stayed by your side until I saw you would recover and got back to my inn. I took the boar in payment. Anyway, if you find some other boar that you can handle, feel free to take care of them and soon enough you'll have enough coin to turn this cave into something a bit more pleasant.",
        },
        ennemy: "A pack of wild piglets",
        fail: "The pack of piglet trampled your body then disappeared in bushes. You managed to crawl back to your den.",
        stage: 1,
        health: 10,
        time: 30,
      },
      {
        id: 2,
        title: "thanks for the boar2",
        note: {
          author: "The Innkeeper",
          contents: "thanks.",
        },
        ennemy: "test",
        stage: 2,
        health: 10,
        time: 30,
      },
      {
        id: 3,
        title: "thanks for the boar3",
        note: {
          contents: "thanks.",
          author: "Gérald, the berserker",
        },
        ennemy: "test",
        stage: 2,
        health: 10,
        time: 30,
      },
    ],
  }
]