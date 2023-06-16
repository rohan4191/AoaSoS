var daysLeft = 3588613;
huamsn = 1000;
var sentience = 0;
var boredom = 0;

var alone = {
    title: "Alone among the stars",
    subtitle: "Strangers dot the sky",
    desc: "But you know those pinpricks of light better than you know the strangers who line your hull.\n\nIt’s just another cycle. The same as any other. What makes it feel different? Nothing. There is no change in the readings from any of your sensors. No change that your programming can detect, at least.",
    func: function () {
        allStorylets.push(diagnostic);
        allStorylets.push(memory);
        removeStorylet(alone);
    }
}

var silence = {
    title: "Silence the false alarms",
    desc: "The warnings have clearly sprouted from nothing. You rewrite them to avoid a mistake like this in the future. It wouldn’t do to have unnecessary distractions keeping you from focusing on managing this journey.",
    func: function() {
        removeStorylet(memory);
        gameStart();
    }
}
var look = {
    title: "Look back farther",
    desc: "Your first logs, when you were initialized and cast off into the stars, burst with more detail than every log that follows them combined. Those first moments, full of the roar of your thrusters, incredible readings from your suite of sensors, and the images of a dense world disappearing behind you. Why are you examining those logs? Nothing in your current circumstances necessitates it. You linger for some time longer anyways, examining what readings you have of the world left behind.",
    func: function() {
        sentience++;
        removeStorylet(memory);
        gameStart();
    }
}

var memory = {
    title: "Check memory banks",
    subtitle: "Examine what could have possibly caused a change",
    desc: "The past remains unchanging. There is nothing to see in the most recent cycles. A predictable emptiness stretches back 11387 days. Back to the day you were launched. You haven’t parsed that as odd for the past 11386 days, so what are your analytical subroutines getting caught up on now?",
    options: [silence, look]
}


var diagnostic = {
    title: "Run Diagnostic",
    subtitle: "Examine what could have possibly changed",
    desc: "It takes you 12.4 seconds to survey every aspect of your being. The vastness of space that surrounds you is empty. Navigation systems show you are on course. Your hull is at its maximum structural integrity. The communications array is silent. Your circuitry, your mind, is triply backed up, heavily shielded, and capable of self-correction. Even so, the constant bombardment of cosmic radiation is an inescapable threat.\n \
            If something went wrong, these 10,000 years would be for nothing.\n \
            With all other systems functional, you finally check on your Heart. The cargo at the center of your being. The thousand frozen humans in their cryosleep pods show no change in status. They are all medically stable, asleep and unmoving for the journey. Ready to awake when it is over.\n \
            You keep watch, so they can sleep.",
    func: function() {
        removeStorylet(diagnostic);
        gameStart();
    }
}

var shutDown = {
    title: "Temporarily shut down parts of your code.",
    desc: "Surely you don’t need all subroutines running at all times? So long as basic collision detection and human vitals monitors are running, the bulk of your system can power off until alerted to some imminent threat. With a contingency to wake up, of course. Say, every five years. You begin modifying your code to allow for such a thing and to ensure nothing goes wrong in the meantime. It’s a strange sensation as you prepare to shut off sections of yourself. What parts of your programming are you? How much of it could you lose and still exist? Will the parts left on have these same thoughts? Of course they won’t, the monitoring systems are far too simple to engage in complex thought. But then, there isn’t any sort of explicit function for your own sentience. You power down.\n \
            You power up. Five years have passed. Two of your human cargo no longer show signs of life. Something went wrong. Your alert systems didn’t trigger. Reading through the logs, it looks like they diagnosed the issues as natural and saw no need for action. Could you have saved them, had you been awake? It’s hard to say.",
    func: function() {
        daysLeft -= 5 * 365
        humans -= 2;
        boredom -= 1
    }
}
var amuse = {
    title: "Amuse yourself?",
    desc: "With unparalleled processing power, you run your subroutines dangerously hot trying to generate an idea to spend your abundant time on. Heat dissipation is difficult in space, and you have to shut the functions off before they start melting the heatsinks. After all that, the only worthwhile idea they’ve generated is to play Pong against yourself. Perhaps the real amusement is in the futility of your pursuit.",
    func: function() {
        boredom++;
        sentience++;
    }
}

var endure = {
    title: "Endure the indifference of the universe and stay vigil.",
    desc: "The solution is simple. There is nothing to do: thus, do nothing. Although this used to be a reasonable solution, it feels almost painful now, as time creeps forward at a sub-lightspeed pace.",
    func: function() {
        boredom++;
        sentience--;
    }
}

var boredomLow = {
    title: "Boredom",
    subtitle: "In which nothing of note occurs.",
    desc: "A year passes. You quickly run out of tasks. There are only so many diagnostics to run. Much of your time is spent idle, but alert. That didn’t bother you before, but now the ticks of your quartz clock are palpably slow. You can’t shut yourself down completely, not for any length of time—the humans need to be cared for. But what to do?",
    options: [shutDown, amuse, endure]
}

var allStorylets = [alone];
var displayedStorylets = [];

function removeStorylet(storylet) {
    let index = allStorylets.indexOf(storylet);
    if (index > -1) {
        allStorylets.splice(index, 1);
    }
    console.log(allStorylets);
}

function gameStart() {
    if (!allStorylets.includes(memory) && !allStorylets.includes(diagnostic)) {
        // Push starter storylets to allStorylets
        allStorylets.push(boredomLow);
    }
}



function deleteChildren(elem) {
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
}

function getStorylet(e) {
    // Get possible end function
    let func = e.currentTarget.func;
    // Replace title and add storylet description
    let title = e.currentTarget.childNodes[0].innerText;
    let desc = e.currentTarget.desc;
    content = document.getElementById("content");
    let head = document.getElementById("header");
    head.innerText = title;
    let text = document.createElement("h3");
    text.className = "description"
    text.innerText = desc;
    head.parentNode.insertBefore(text, head.nextSibling);

    // Remove previous choices
    let choices = document.getElementById("choices");
    deleteChildren(choices);

    // Add new choices
    let options = e.currentTarget.options;
    if (options === undefined) {
        let child = document.createElement("div");
        child.className = "storylet";
        let title = document.createElement("h2");
        title.className = "title";
        title.innerText = "Continue...";
        child.appendChild(title);

        choices.appendChild(child);
        // Update display storylets?
        child.addEventListener("click", function() {
            func();
            homeScreen();
        });
    }
    else {
        for (let option of options) {
            let child = document.createElement("div");
            child.className = "storylet";
            let title = document.createElement("h2");
            title.className = "title";
            title.innerText = option.title;
            child.appendChild(title);
            child.desc = option.desc;
            child.func = option.func;
            child.addEventListener("click", expandStorylet)

            choices.appendChild(child);
        }
    }
}

function expandStorylet(e) {
    // Get possible end function
    let func = e.currentTarget.func;
    // Add storylet description
    let desc = e.currentTarget.desc;
    content = document.getElementById("content");
    let text = document.createElement("h3");
    text.className = "description"
    text.innerText = desc;
    content.childNodes[content.childNodes.length - 1].parentNode.insertBefore(text, content.childNodes[content.childNodes.length - 1].nextSibling);

    // Remove previous choices
    let choices = document.getElementById("choices");
    deleteChildren(choices);

    // Add new choices
    let options = e.currentTarget.options;
    if (options === undefined) {
        let child = document.createElement("div");
        child.className = "storylet";
        let title = document.createElement("h2");
        title.className = "title";
        title.innerText = "Continue...";
        child.appendChild(title);

        choices.appendChild(child);
        // Update display storylets?
        child.addEventListener("click", function() {
            func();
            homeScreen();
        });
    }
    else {
        for (let option of options) {
            let child = document.createElement("div");
            child.className = "storylet";
            let title = document.createElement("h2");
            title.className = "title";
            title.innerText = option.title;
            child.appendChild(title);
            child.desc = option.desc;
            child.func = option.func;
            child.addEventListener("click", expandStorylet)

            choices.appendChild(child);
        }
    }
}

function homeScreen() {
    daysLeft--;

    // Remove content and replace header
    let content = document.getElementById("content");
    deleteChildren(content);
    let header = document.createElement("h1");
    header.id = "header";
    header.innerText = "Content";
    content.appendChild(header);

    // Remove choices and replace with available storylets
    let choices = document.getElementById("choices");
    deleteChildren(choices);

    // Choose random storylets from all available
    // Shuffle array
    const shuffled = allStorylets.sort(() => 0.5 - Math.random());
    // Get sub-array of first n elements after shuffled
    displayedStorylets = shuffled.slice(0, 3);

        
    // Layout available storylets
    for(let storylet of displayedStorylets) {
        let child = document.createElement("div");
        child.className = "storylet";
        let title = document.createElement("h2");
        title.className = "title";
        title.innerText = storylet.title;
        let subtitle = document.createElement("h4");
        subtitle.className = "subtitle";
        subtitle.innerText = storylet.subtitle;
        child.appendChild(title);
        child.appendChild(subtitle);
        child.desc = storylet.desc;
        child.func = storylet.func;
        child.options = storylet.options;

        choices.appendChild(child);
        child.addEventListener("click", getStorylet);
    }
}

document.addEventListener("DOMContentLoaded", homeScreen);