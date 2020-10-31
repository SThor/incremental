export let contracts = [
  {
    id: 1,
    title: "Thanks for the boar",
    note: {
      author: "Thomas, the innkeeper",
      contents: "Hey there, thanks for taking care of that boar! You managed to kill it, but looking at you I could tell you had it rough. With all those wars, I guess no one has time to get rid of the bloody things before they get that big. Oh well. I found the boar lying dead in a nearby clearing and you in this cave. I can't be bothered with strangers these days, but I couldn't decently leave you in such a mess. I patched you up, stayed by your side until you recovered and got back to my inn. I took the boar in payment, if you don't mind. Anyway, if you find some more that you can handle, feel free to take care of them. You'll get enough coins to turn this cave into something decent in no time!",
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
];

export let chapters = [
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
        info: "As you pick it up, you notice a wounded boar charging at you from the corner of the eye.",
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
  }
]