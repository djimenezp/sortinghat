# Facing the sorting hat

## WITH Madrid recruitment test

# Introduction

In this test, we'll assert different abilities

* Create maintainable code

* Use visual creativity

* Knowledge of browser APIs

The problem is simple. Imagine that you are managing a wizarding boarding school where kids will be living most of their lives over the course of 7 years. In order to manage your student's personalities, you create 4 different houses which will hold together students based on behavioral aspects.

Following [intense psychological research](https://repositorio.uam.es/bitstream/handle/10486/691219/science_jacob_CP_2019.pdf?sequence=1&isAllowed=y), you settle on 4 houses with the following values:

* **Gryffindor** — bravery, helping others and chivalry

* **Hufflepuff** — hard work, patience, loyalty and fair play

* **Ravenclaw** — intelligence, knowledge, planning ahead and wit

* **Slytherin** — ambition, cunningness, heritage and resourcefulness

Since it is a wizards school you might imagine that it would a good idea to sort out students using a magical item that you could call a sorting hat, however as this very profound psychological research emanates from muggle background you must instead decide to **create a Vue.js app (or React/Angular app)** that will attribute students to the appropriate house.

# Functional specifications

Such a test [already exists on the Internet](https://wizardmore.com/sorting-hat-x/) and you *should* try it out for reference. You will however make it in a different form than the presented example. The test that **you must realize** will be presented **like a chat application**.

## Structure

The test will proceed in the following fashion:

1. Ask the user's name

2. Ask the sorting hat questions

3. Give the outcome to the user

## Questions and computation

The way that this test works is by having a "matching score" for each house (**G**ryffindor, **H**ufflepuff, **R**avenclaw and **S**lytherin as listed above). Then, each question will contribute points to one or several houses.

For example, when the test asks "Given the choice, would you rather invent a potion that would guarantee you", if the user says "Love?" **then 100 points are added to the H** counter while answering "Glory?" **will give 100 points to the G** counter. On the other hand if the user says that their favorite pet is a "Snowy owl" then the **G counter is increased by 25 points, the R by 50 and the H by 50**.

At the end of the game, the house with the most points is chosen for the user.

The questions of the test have been extracted in the [linked JSON file](https://gist.github.com/Xowap/b01fbce0c23971e23ab28427c09f92b3).

This JSON file contains a list of questions. For each question you will find the following fields:

* title — Text of the question to be asked to the user

* answers — List of possible answers

  * title — Text label of this answer

  * scores — Number of points to add to each house if this answer is chosen

Needless to say that **all questions** listed in the JSON file **must be asked** to the user before announcing anything to the user (as opposed to the current test that gives you the live results).

## Presentation

The presentation must be a **chat-like app**. You can use [the ActiveSeed simulator](https://activeseed.fr/simulation/chat) as an example for the way to display and animate questions.

Questions and answers have **very variable sizes**, it is expected that the conversation mechanic proposed by **your project accounts for it** and works smoothly in terms of UX/UI with both the shortest and longest questions.

And finally, **questions are presented as a MCQ** in this JSON file, however **feel free to alter them** if you can think of **different UXs** for some questions that collect the same information but in a more pleasant way.

## Browser-related considerations

Regarding the visual aspect of the app:

* The app works on screens ranging **from** **320px** width **to** **3000px** width  
* **All questions and answers are animated** when coming into the screen or going away, in order to provide a smooth experience  
* The **user can scroll** up the conversation however **new "messages" must be scrolled smoothly into the viewport**  
* The experience is flawless in target browsers (in a version of your choosing):  
  * **Safari** on **iPhone**  
  * **Firefox** on **Windows or Linux**  
  * If you do not own those devices, you can test them using the [BrowserStack free trial](https://www.browserstack.com/).

# Deliverable

What we expect to receive after you complete this exercise is:

* A project coded **using Vue.js, React or Angular** as a framework. On a side note, you can use any helper/build tool that you want (Nuxt, Vite, Webpack, Rollup or anything you might think of).  
* The produced code must be sent back to us either as a **GitHub repository** either as a zip file containing the code of the application  
* The project's README must include the following information  
  * Instructions to **build and run** the project  
  * Instructions and **guidelines for future contributions**, as if your project was a **public open-source project**

# Conclusion

The goal of this exercise is to test your skills as a front-end developer with the following challenges:

* Making an animated chat  
* Thinking about UX  
* Structuring code in a maintainable way

Good luck wizards\!