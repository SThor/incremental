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
        info: "You see a unusually long and heavy sword lying next to you.",
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
        info: "You found refuge in the cave.",
        button: "Drift into a deep slumber"
      },
      {
        info: "On waking up your body is still aching all over. You find a note thanking you for defeating the boar, along with a nice round coin.",
        button: "Read the note"
      }
    ]
  },
  {
    type: "adventure",
    title: "Beginning of an empire",
    contracts: [{ title: "thanks for the boar", contents: "thanks." },{ title: "thanks for the boar", contents: "thanks." }],
  }
]