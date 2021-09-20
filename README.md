# OpenEar

OpenEar is an open source ear training app for musicians. It's goal is to provide a flexible variety of exercises so musicians will be able to master recognizing any musical pattern that might help them become better musicians. 

Currently includes the following built in exercises:

1. Identify interval
2. Identify note in a tonal context
3. Identify chord & chord progressions in a tonal context

The app is still under initial development and might contain bugs and incompleted features. 

![Image](https://i.imgur.com/SFcYW2a.png)

## Contribution

OpenEar app is built in Angular using the Ionic library. It uses [Tone.js](https://tonejs.github.io/) to generate sounds.
The easiest way to contribute to OpenEar is creating some new exercises on the existing infra. 
To contribute follow the following steps.

1. Fork the repository
2. open the respository root
3. Run `yarn` or `npm i` (you may need to install node if you don't have it installed already)
4. ran `yarn start`
5. App should be served in the browser!

To implement new exercises, you need to write a class that implements `Exercise.IExercise` interface. See examples in src/app/exercise/exercises.
After implementing this class you will need to add it to `ExerciseService#_exerciseList`.

If you would like to contibute in adding some features to the core infra of the app, you can do so as well. Here is a quick description of the infra:
- PlayerService is a wrapper on Tone.js that enabels playing parts and return a promise that resolves when the part completed playing.
- ExerciseStateService manages the state of the exercise, including user actions (like answering, requesting repeat etc). This does not hold any UI element. 
- ExercisePage is the UI part of ExerciseStateService and it manages rendering the UI, getting user input and displaying any indication. 
- Under src/app/exercise you will also find a "utility" folder that has a tone of musical utilites like generating scales, chord progression etc. You can also convert notes to numbers to make calculation to them etc. 