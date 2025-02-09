// Part 1: Humble Beginnings

const adventurer = {
    name: "Robin",
    health: 10,
    inventory: ["sword", "potion", "artifact"],
    // *** "companion" is not an array, it is an object ***
    companion: {
        name: "Leo",
        type: "Cat"
    },
    roll (mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`)
        }
}

// 1. create a loop that logs each item in Robin’s inventory
 const inventoryArray =["shield", "dagger", "hat"]

for (let item of inventoryArray) {
    adventurer.inventory.push(item);
    console.log(`Added ${item} to inventory.`);
}
console.log("Inventory:", adventurer.inventory);

// 2. Next, give Robin’s feline friend a friend of his own:
// Add a “companion” sub-object to “Leo” with the following properties:
// The companion’s name is “Frank.”
// The companion’s type is “Flea.”
// The companion has its own belongings, which includes a small hat and sunglasses.

// This is wrong because companion is not an array, it's an object. Pay attention to bracket types.
// adventurer.companion[0].type[0]="companion"
// adventurer.companion[0].companion[0].name = "Frank";
// adventurer.companion[0].companion[0].type = "flea";
// adventurer.companion[0].companion[0].inventory=["small hat", "sunglasses"];

adventurer.companion.companion = {
    name: "Frank",
    type: "flea",
    inventory: ["small hat", "sunglasses"]
};
console.log(adventurer);

// 3. Method for “dice rolls,” a common way to handle outcomes in adventuring games. Test this method by calling adventurer.roll() a few times.
adventurer.roll();
adventurer.roll();
adventurer.roll();

// Part 2: Class Fantasy

// Start with a Character class, which will define generic character entities. Robin and their companions all have a name, so the Character class should definitely include name as one of its properties. At this stage, we will also make the decision that every character should have health (which we will standardize to a maximum of 100, and an inventory (even if the inventory is empty).

class Character {
    constructor (name) {
      this.name = name;
      this.health = 100;
      this.inventory = [];
    }
  }

  // Every character should also be able to make rolls. Add the roll method to the Character class.
// Now, we can re-create Robin using the Character class!
const robin = new Character("Robin");
robin.inventory = ["sword", "potion", "artifact"];
robin.companion = new Character("Leo");
robin.companion.type = "Cat";
robin.companion.companion = new Character("Frank");
robin.companion.companion.type = "Flea";
robin.companion.companion.inventory = ["small hat", "sunglasses"];

// Part 3: Class Features

// Expand upon Adventurer class with your own properties and methods.
class Adventurer extends Character {
    constructor (name, role) {
      super(name);
      // Adventurers have specialized roles.
      this.role = role;
      // Every adventurer starts with a bed and 50 gold coins.
      this.inventory.push("bedroll", "50 gold coins");
    }
    // Adventurers have the ability to scout ahead of them.
    scout () {
      console.log(`${this.name} is scouting ahead...`);
      super.roll();
    }
  }

// 2. create a Companion class with properties and methods specific to the companions.
class Companion extends Character {
    constructor (name, type, inventory=[]){
        super(name);
        this.type =type;
    this.inventory = inventory; 
    }
   disappear(){
    console.log(`${this.name} has disappeared. Invisibility activated.`);
    super.roll();
   }
}
console.log(Companion);

// 3. Finally, change the declaration of Robin and the companions to use the new Adventurer and Companion classes.
 const Robin = new Adventurer("Robin", "adventurer");
 Robin.companion = new Companion("Leo", "Cat");
 Robin.companion.companion = new Companion("Frank", "Flea", ["small hat", "sunglasses"]);

 console.log(Robin);

// Part 4: Class Uniforms

// Using static properties and methods, you can create uniform attributes for the class itself rather than instances of the class. Static properties are typically constant values that can be used elsewhere for reference, or utility methods that do not rely on the values of a specific class instance.

// Using the static keyword:
// 1. Add a static MAX_HEALTH property to the Character class, equal to 100.

// 2. Add a static ROLES array to the Adventurer class, with the values “Fighter,” “Healer,” and “Wizard.” Feel free to add other roles, if you desire!

// 3. Add a check to the constructor of the Adventurer class that ensures the given role matches one of these values. 

// 4. Are there other static properties or methods that make sense to add to these classes?

// Part 5: Gather your Party

// Sometimes, you need many objects of a class that have one or more shared property values. A common approach for creating many similar objects of a single class, and keeping track of them is creating a “factory.”

// Factories are classes that generate objects according to the factory’s instance properties.

// As an example, let’s look at how we might create many “healer” role adventurers using a factory:
class AdventurerFactory {  
  constructor (role) {
    this.role = role;
    this.adventurers = [];
  }
  generate (name) {
    const newAdventurer = new Adventurer(name, this.role);
    this.adventurers.push(newAdventurer);
  }
  findByIndex (index) {
    return this.adventurers[index];
  }
  findByName (name) {
    return this.adventurers.find((a) => a.name === name);
  }
}

const healers = new AdventurerFactory("Healer");
const robinn = healers.generate("Robinn");

// An alternative approach to this would be to extend the Adventurer class to create a Healer class. This would be the practical approach if healers had additional properties and methods, but if healers are just adventurers with a specific role, creating an entire class for them is inefficient.

// Part 6: Developing Skills

// Many of the core features of these characters are now implemented, but the adventurers cannot  really do much yet. The only action (method) they have is scout().
// 1. Create an additional method, duel(), for the Adventurer class with the following functionality:
// a. Accept an Adventurer as a parameter.

// b. Use the roll() functionality to create opposing rolls for each adventurer.

// c. Subtract 1 from the adventurer with the lower roll.

// d. Log the results of this “round” of the duel, including the rolls and current health values.

// e. Repeat this process until one of the two adventurers reaches 50 health.

// f. Log the winner of the duel: the adventurer still above 50 health.

// 2. What other properties and methods could these classes have? Should fighters, healers, and wizards have their own methods? Should companions have specific methods?

// Feel free to experiment with your own ideas, be they silly or practical. The goal of this exercise is to develop new skills for the characters and yourself! Express your creativity.

// Part 7: Adventure Forth
// Now that you have convenient ways to create a variety of characters with a variety of methods, experiment! Generate a whole host of adventurers and their companions, and have them interact using the instance methods you have developed.

// If time allows, create other classes that can interact with your characters; perhaps more characters, but in a different direction from adventurers or companions – dragons, orcs, elves, vampires...

// You can also create classes for the inventory itself, and include inventory methods such as adding, removing, searching, selling, trading. Even individual items could be their own classes, and have properties and methods specific to the type of item.

// While this activity is intended to be light-hearted and silly, every tool you have utilized thus far is extremely common and relevant in every variety of development environment, from game development to data processing to complex enterprise applications.

// Object-oriented programming is a feature of almost every modern programming language, and being comfortable with its core concepts will enable you to be a more capable developer!