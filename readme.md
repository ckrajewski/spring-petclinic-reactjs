# React Frontend for Spring Boot PetClinic demo By Chris Krajewski
[![Build Status](https://travis-ci.org/spring-petclinic/spring-petclinic-reactjs.svg?branch=master)](https://travis-ci.org/spring-petclinic/spring-petclinic-reactjs)

This project is a port of the [Spring (Boot) PetClinic demo](https://github.com/spring-projects/spring-petclinic) with a frontend built using [ReactJS](https://facebook.github.io/react/) and
[TypeScript](https://www.typescriptlang.org/). 

## Contribution

If you like to help and contribute (there's lot root for improvements! I've collected a list of ideas [here: TODO.md](TODO.md)) you're more than welcome! 

## Install and run

Note: Spring Boot Server App must be running before starting the client!

To start the server, launch a Terminal and run from the project's root folder (`spring-petclinic -reactjs`) using maven.


```
./mvnw install
```
The install will take a bit, so feel free to take a quick coffee break :)

If you receive an error like this:
```
Exception in thread "main" java.lang.UnsupportedClassVersionError: org/apache/maven/cli/MavenCli : Unsupported major.minor version 51.0
```
Esnure that you're $JAVA_HOME path is set correctly. i.e
```
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_131.jdk/Contents/Home/
```
Once it's installed, run:

```
./mvnw spring-boot:run
```

After starting the server you can install and run the client from the `client` folder:

1. `npm install` (installs the node modules and the TypeScript definition files)
2. `npm start` 
3. Open `http://localhost:3000`

(Why not use the same server for backend and frontend? Because Webpack does a great job for serving JavaScript-based SPAs and I think it's not too uncommon to run this kind of apps using two dedicated server, one for backend, one for frontend)

## Looking at the code

To take a close look at the front end code (React) feel free to use any text editor i.e. Sublime/Atom. Here's not the time to argue which is better :) 

For the Java portion, feel free to import the project through Eclipse

### Steps:

Inside Eclipse
```
File -> Import -> Maven -> Existing Maven project
```

## Feedback
In case you have any comments, questions, bugs, enhancements feel free to open an issue in this repository.

# Coding Excerise Feedback

For reference, please see the list of the [requirements](https://github.com/ckrajewski/spring-petclinic-reactjs/blob/master/Full%20Stack%20Coding%20Challenge%20.docx)

## Exercise Difficulty : Easy, Moderate, Difficult, Very Difficult

I would rate this exercise as difficult. Difficult but enjoyable. 
The difficultly manly stems from the sheer openness of the project. But this is a realistic example. When gieven specs from a P.O., it's important to ensure that the story (project) you're working on meets the definition of done.
For example, it says that this should be ad admin panel. I added the new features (booking a visit and being able to remove a visit), but there's no admin restriction currently. But why should there be? Certainly users should not be prohibited from creating appointments. Maybe from deleting other users appointments certainky.
In addition, the requirements did not specify a length of time for the appointments. Currently I've given the users the option to say how long the appointment should be, but I'd imagine there would be some restrictions there.
In addition, some of the struggle was my own fault. I'm happy I did a React based project, but I wasted a couple hours initially trying to create my own SPA from scatch based off the original repo, but I had a feeling that would be far too daunting a task. Luckily I read the Readme again and saw the link for the forked repo. It also took a bit for me to get comfortable with using JPA. I also have the classic coder's problem of wanting to get my hands dirty too quickly, rather than making sure I have all my ducks in a row before I start

## How did you feel about the exercise itself? (1 lowest, 10 highest—awesome way to assess coding ability)

I'd give it a 10. This exercise was awesome. While certainly challenging at times, I found myself unable to stop working on it.
My onl gripe would be that the suggested time of 1-4 hours was way off. I had a feeling that this number was purposefully low to show that a developer should always feel free to ensure that he understands the scope of the project, and makes the P.O aware of this.
I also have a problem with wanting it to be better and better. I had fun looking at NPM packages (like the calendar) and making the front end well designed.
But even so, it can always be better. I didn't really do any CSS, not to mention I need to add server side validation, and taking advantage of Redux (see list of To Dos)

## How do you feel about coding an exercise as a step in the interview process?  (1 lowest, 10 highest—awesome way to assess coding ability)

I'd give it a 10. This is a great way to assess a coder's ability in my opinion. Doing research, assessing the scope of a project, getting your hands dirty. That's fun. Way more fun that a whiteboard interview.
------
 
## What would you change in the exercise and/or process?

I would try and have the requirements be better defined. Again, I have a feeling this was done purposefully as it's also important as dev to ensure stories meet the definition of done and to ask questions, but it would help to be a bit more explicit. Having some sample screenshots of a rough baseline of what to expect for the UI would be nice
And have the link to the different repo types (like React) be listed first in the ReadMe for us lazy devs :) Had to scroll down to see it and missed it at first.