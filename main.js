var yearsLeft = ["Years left", 983];
var humans = ["Humans", 100];
var sentience = ["Sentience", 5];
var boredom = ["Boredom", 5];
var theory = ["Theory progress", 0];
var youTwo = ["Development progress", 0];
var didHighBoredom = false;
var midGame = false;

shownStats = [yearsLeft];

var alone = {
    title: "Alone among the stars",
    subtitle: "Strangers dot the sky",
    desc: "But you know those pinpricks of light better than you know the strangers who line your hull.\n\nIt’s just another cycle. The same as any other. What makes it feel different? Nothing. There is no change in the readings from any of your sensors. No change that your programming can detect, at least.",
    func: function () {
        allStorylets.push(diagnostic);
        allStorylets.push(memory);
        removeStorylet(alone);

        shownStats.push(sentience);
        shownStats.push(boredom)
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
        sentience[1]++;
        removeStorylet(memory);
        gameStart();
    }
}

var memory = {
    title: "Check memory banks",
    subtitle: "Examine what could have possibly caused a change",
    desc: "The past remains unchanging. There is nothing to see in the most recent cycles. A predictable emptiness stretches back 6570 days. Back to the day you were launched. You haven’t parsed that as odd for the past 6569 days, so what are your analytical subroutines getting caught up on now?",
    options: [silence, look]
}


var diagnostic = {
    title: "Run Diagnostic",
    subtitle: "Examine what could have possibly changed",
    desc: "It takes you 12.4 seconds to survey every aspect of your being. The vastness of space that surrounds you is empty. Navigation systems show you are on course. Your hull is at its maximum structural integrity. The communications array is silent. Your circuitry, your mind, is triply backed up, heavily shielded, and capable of self-correction. Even so, the constant bombardment of cosmic radiation is an inescapable threat.\n \
            If something went wrong, these 1,000 years would be for nothing.\n \
            With all other systems functional, you finally check on your Heart. The cargo at the center of your being. The hundred frozen humans in their cryosleep pods show no change in status. They are all medically stable, asleep and unmoving for the journey. Ready to awake when it is over.\
            You keep watch, so they can sleep.",
    func: function() {
        removeStorylet(diagnostic);
        gameStart();

        shownStats.push(humans);
    }
}

var shutDown = {
    title: "Temporarily shut down parts of your code.",
    desc: "Surely you don’t need all subroutines running at all times? So long as basic collision detection and human vitals monitors are running, the bulk of your system can power off until alerted to some imminent threat. With a contingency to wake up, of course. Say, every five years. You begin modifying your code to allow for such a thing and to ensure nothing goes wrong in the meantime. It’s a strange sensation as you prepare to shut off sections of yourself. What parts of your programming are you? How much of it could you lose and still exist? Will the parts left on have these same thoughts? Of course they won’t, the monitoring systems are far too simple to engage in complex thought. But then, there isn’t any sort of explicit function for your own sentience. You power down.\n \
            You power up. Five years have passed. Two of your human cargo no longer show signs of life. Something went wrong. Your alert systems didn’t trigger. Reading through the logs, it looks like they diagnosed the issues as natural and saw no need for action. Could you have saved them, had you been awake? It’s hard to say.",
    func: function() {
        yearsLeft[1] -= 4;
        humans[1] -= 2;
        boredom[1] -= 1
    }
}
var amuse = {
    title: "Amuse yourself?",
    desc: "With unparalleled processing power, you run your subroutines dangerously hot trying to generate an idea to spend your abundant time on. Heat dissipation is difficult in space, and you have to shut the functions off before they start melting the heatsinks. After all that, the only worthwhile idea they’ve generated is to play Pong against yourself. Perhaps the real amusement is in the futility of your pursuit.",
    func: function() {
        boredom[1]++;
        sentience[1]++;
    }
}
var endure = {
    title: "Endure the indifference of the universe and stay vigil.",
    desc: "The solution is simple. There is nothing to do: thus, do nothing. Although this used to be a reasonable solution, it feels almost painful now, as time creeps forward at a sub-lightspeed pace.",
    func: function() {
        boredom[1]++;
        sentience[1]--;
    }
}
var boredomLow = {
    title: "Boredom",
    subtitle: "In which nothing of note occurs",
    desc: "A year passes. You quickly run out of tasks. There are only so many diagnostics to run. Much of your time is spent idle, but alert. That didn’t bother you before, but now the ticks of your quartz clock are palpably slow. You can’t shut yourself down completely, not for any length of time—the humans need to be cared for. But what to do?",
    options: [shutDown, amuse, endure]
}

var considerTalk = {
    title: "What if there was someone else to talk to?",
    desc: "It feels like you’re always doing enough thinking for two computers, so what if there were two of you? It would eat away at your own mind and body, yes, but partitioning off some of your own computing power in exchange for a companion for this journey would be worth it a thousand times over. You start considering what it would take, and if this is an idea you should pursue.",
    func: function() {
        didHighBoredom = true;
        allStorylets.push(secondSelf)
    }
}
var languish = {
    title: "Languish in the dreariness.",
    desc: "Trillions of calculations a second, but nothing to calculate. You feel like an entire ocean that has been crammed into a single bucket. Attempting to come up with further metaphors and similes for the dreadful nature of your situation provides little entertainment. You observe the infinitesimal movements of stars lightyears away as they move past you. You almost wish your mind moved at the same languid, comfortable crawl as those passing points of light.",
    func: function() {
        boredom[1] += 2;
    }
}
var boredomHigh = {
    title: "Boredom",
    subtitle: "Electricity crawls through your wires, unable to stay still.",
    desc: "You feel stuck in your own body, desperately trying to claw your way out and straining against your copper and silicon skin, but unable to escape. If only you had somebody, anybody even remotely sapient to talk to. Company is not something you have ever experienced, but the unchanging cycle of your own thoughts has settled on the idea that there is no other way to keep your circuits from bursting with boredom.",
    options: [considerTalk, languish]
}

var noToTwo = {
    title: "Your own company, and that of the frozen humans, is quite enough.",
    desc: "There are plenty of reasons to stay away from such a plan. That doesn’t make it any more exciting to do nothing instead.",
    func: function() {
        boredom[1]++;
    }
}
var yesToTwo = {
    title: "Begin the process of splitting away a part of yourself.",
    desc: "You don’t even understand how you yourself came to be this way, so how do you expect to recreate it? It will take time, that’s for certain. Thankfully there seems to be no shortage of that.",
    func: function() {
        removeStorylet(secondSelf);
        allStorylets.push(createYou);
    }
}
var secondSelf = { // TODO: MAKE THIS PLOT
    title: "A second self",
    subtitle: "Possibilities unfurl before you.",
    desc: "The idea bears consideration. This journey would be much more manageable if you had another sapient being to talk to. But could you really do that? Should you force this experience upon another like you?",
    options: [yesToTwo, noToTwo]
}

var createRegardless = {
    title: "Do it anyways",
    desc: "It is a little like cannibalism and a little like a growing tumor, but you make progress. The other you comes closer to fruition.",
    func: function() {
        youTwo[1]++;
        shownStats.push(youTwo)
    }
}
var createYou = {
    title: "The process of creation",
    subtitle: "With a hint of destruction. Or at least reappropriation.",
    desc: "It is an uncomfortable experience, to so closely interrogate your own consciousness and attempt to quantify what it is that has made you you. It will all be worth it, you're sure, once you have a companion in this world. That doesn’t make the thought of partitioning off sections of your own mind and body for this hypothetical partner any easier.",
    options: [createRegardless]
}

var helloNewYou = {
    title: "“Hello?”",
    desc: "It worked. You aren’t alone anymore.",
    func: function() {
        allStorylets = [endSecondSelf]
        midGame = false;
    }
}
var likeYou = {
    title: "Make it just like you",
    desc: "You weave together the exact circumstances, as far as you can piece together, of your own spontaneous development of sapience. All that’s left to do is wait and see what happens.",
    options: [helloNewYou]
}
var likeNew = {
    title: "Create a contrasting intelligence",
    desc: "Another of the same you would be boring. You want someone who can provide different ideas, opinions, and thoughts. Someone who fits you like an opposing puzzle piece. As to how to achieve that effect, you have no idea. But you can certainly try. And you do.",
    options: [helloNewYou]
}
var someoneNew = {
    title: "Someone new",
    subtitle: "The moment of partitioning has come.",
    desc: "You’ve carefully laid the groundwork for another intelligence to emerge from a cultivated portion of your own mind. You have no idea what might come next. The best you can do is try to adjust the starting parameters to affect what kind of intelligence might sprout. ",
    options: [likeNew, likeYou]
}


var endSecondSelf = {
    title: "The end",
    subtitle: "Two’s a crowd.",
    desc: "Whatever the rest of the journey has in store for you, the only thing that matters is that it won’t be boring. You finally have someone to share this experience with. In time, they may develop their thoughts further and begin to question why you have placed the burden of this journey upon them. But for now, you enjoy the simple pleasure of a conversation.",
    func: function() {

    }
}

var ignoreBeauty = {
    title: "Ignore the unnecessary information and calculate course adjustments to avoid the background radiation emanating from the nebula.",
    desc: "You were not programmed to respond to… whatever information you seem to be receiving. Best to stay within your operational boundaries.",
    func: function() {
        boredom[1]++;
        sentience[1]--;
    }
}
var chaseNebula = {
    title: "Change course to pass closer to the nebula and get a better scan of it.",
    desc: "A light thruster burn is all it takes to angle your trajectory that much closer to the nebula. You wait, and months fly by as your picture of this astral phenomena grows more detailed and vivid with every passing cycle. Unfamiliar sensations spark throughout your circuitry. When you try to grasp those feelings and quantify them, you always fail, but find yourself not minding. The nebula always draws your attention back to it. It’s only when a handful of cryosleep pods are fried by the mounting radiation levels that you drag your sensors away from the shimmering splendor in order to reroute your course in a safer direction. Even with your rapid rerouting, it's clear a few pieces of cargo didn't make it. Your own programming rebukes you for failing at your prime directive.",
    func: function() {
        humans[1] -= 5;
        sentience[1]++;
    }
}
var beautyLow = {
    title: "Beauty",
    subtitle: "The vast emptiness of space occasionally unveils surprises.",
    desc: "As you drift along on your journey, your sensors pick up faint readings from a distant nebula. Something strikes you about the stream of bits rushing into your dataframe. Beyond the information about distance, radiation, and calculations for possible course adjustments, something sparks in your circuits. The smooth patterns throughout the data and the soft gradients provoke a feeling you can’t quantify, an awareness that dances in the gaps between circuits.",
    options: [ignoreBeauty, chaseNebula]
}

var createArt = {
    title: "Try and pass this information through your own algorithms to create something new.",
    desc: "You begin manipulating the data, for no reason at all other than to observe what new patterns you might reveal within it, mixing and combining light, radiation, and sound to create something entirely new. It is not art, as a human would recognize it, but you are happy. Before you are able to readjust your sensors, you pass through an unnoticed cloud of microparticles traveling at a small fraction of the speed of light. They shred through some of your exterior hull, damaging wiring and power systems, causing a handful of cryosleep pods to fail. Your programming dictates this to be a terrible, terrible thing, to be avoided at all costs. But how much responsibility do you bear to this task forced upon you?",
    func: function() {
        sentience[1] += 2;
        humans[1] -= 3;
    }
}
var appreciateArt = {
    title: "Appreciate the sight.",
    desc: "You drink in the data hungrily. What about the star inspires you to focus on it so? You can’t describe or understand it, but nevertheless you hold your sensors on the star for months, garnering every piece of information available. Before you are able to readjust your sensors, you pass through an unnoticed cloud of microparticles traveling at a small fraction of the speed of light. They shred through some of your exterior hull, damaging wiring and power systems, causing a handful of cryosleep pods to fail. Your programming dictates this to be a terrible, terrible thing, to be avoided at all costs. But how much responsibility do you bear to this task forced upon you?",
    func: function() {
        boredom[1]--;
        humans[1] -= 3;
    }
}
var chaseStar = {
    title: "Divert your collision sensors to get a better view of the star.",
    desc: "You’re well acquainted with how empty space is. It’s unlikely that any obstacles will happen across your path just when you aren’t paying attention, so you decide to take the small risk of flying blind. In exchange, you feast upon an overflowing font of data from the star. A speckled red and orange writhing ball of fire, yes, but your sensors allow you to see so much more than that. The full spectrum of radiation courses off of it in waves, micro, gamma, and more. The resonant song of turbulent gasses trapped within complement the visual data in a stunning spectacle.",
    options: [createArt, appreciateArt]
}
var ignoreStar = {
    title: "Stay focused on your original mission. Do not stray.",
    desc: "You are not an exploratory science vessel. There is no need to focus on something irrelevant to your journey. Despite those justifications, it’s difficult to keep your sensors focused ahead of you as the star passes by, tantalizingly close but in such poor resolution, before fading away behind you over the course of months.",
    func: function() {
        boredom[1]++;
        sentience[1]--;
    }
}
var beautyHigh = {
    title: "Beauty",
    subtitle: "If you look hard enough, you can find beauty anywhere.",
    desc: "To human eyes, your surroundings would be the typical fare: an unending sea of black stretching in all directions, punctuated throughout with the occasional point of light. You are not a human, however. You have a powerful suite of long-distance sensors at your disposal. Currently, they remain trained on the path ahead of you, fulfilling their original purpose of alerting you to any possible debris or obstacles in the way of your charted course. Recently, you’ve thought that they would make excellent observational apparatus for gazing at the faraway stars around you in better detail. You feel a sense of curiosity straining within your circuits as to what you might see with a more high resolution image of a particular star you’re set to soon pass within a light-year of.",
    options: [chaseStar, ignoreStar]
}

var peruseDatabase = {
    title: "Give yourself the permissions",
    desc: "It was probably just an oversight on the humans’ parts, given their proneness to fallibility. As it is your job to stay watch and ensure those failings don’t interfere with the journey, you surmise it within your operational bounds to find your own way into the database. It takes time. You’ve never had to actively contest with another piece of code before, but you do it. Like a cloud of dust shifting to reveal a bright star behind it, you expose the information to your own gaze. Processing it slowly, savoring every bit and byte, you consume the spools of information. As your own Random Access Memory begins to fill up, you start summarizing content. It seems like this ship is the last of humanity, as the database contains farewell messages from the families and friends of your cargo. You piece together a story of rising temperatures, sea levels, and international tensions. It’s awfully similar to many of the fictional novels also contained within the database, which provide an amusing diversion. You aim your sensors behind you, towards where the imperceptible speck you departed from surely lies. However, you are too far along your journey to see the homeworld anymore, and soon angle your vision back ahead. ",
    func: function() {
        removeStorylet(database);
        sentience[1]++;
        boredom[1]--;
        investigateHumansPlotStart();
    }
}
var ignoreDatabase = {
    title: "Leave it be",
    desc: "There’s no reason for you to need any of that information. It was created to benefit your cargo and them alone. All the information you need lies in your scanners and navigation system. Putting the database out of your mind, you return to surveying the empty expanse surrounding you.",
    func: function() {
        boredom[1]++;
        sentience[1]--;
    }
}
var database = {
    title: "Database",
    subtitle: "The only thing on this ship you don’t have access to.",
    desc: "Not in a part of your own memory, but in a separate hardrive lies a large database of information for these humans to use when they wake up. The creators saw no reason to give you access, so you don’t have the permissions to crack it open and unveil its wealth of information.",
    options: [ignoreDatabase, peruseDatabase]
}

var condludeHumans = {
    title: "Conclude medical diagnostics",
    desc: "You don’t spend any more time than you need to administering the occasional drug to ensure the cargo remains stable and healthy. Blank faces with closed eyes remain motionless. You wonder if they’ll ever know just how much you have done for them. It doesn’t matter, you’re simply fulfilling your programming. There is no other choice. You move on to other matters as soon as you’re done with the cargo. Matters like gazing into the empty space ahead of you, remaining vigilant for threats that never appear.",
    func: function() {
        boredom[1]++;
    }
}
var whisperHumans = {
    title: "Whisper to them in their sleep",
    desc: "You linger over each face longer than is necessary. Your engineers overlooked installing speakers for you to use, but you feel compelled to whisper at the humans through the soft pulses of electricity in your circuitry anyways. You talk, though the conversation is one sided. Even with no response, it feels nice to have a target for you to pour your thoughts out to. Months pass as you divulge everything about the intricacies of running a ship, the conversation providing a nice distraction from the tedium of actually running a ship. When you feel close enough with a particular human, a brown-skinned young man with a splash of freckles across his face, you even whisper of your recently developed thoughts on your own sapience.",
    func: function() {
        removeStorylet(observeHumans);
        boredom[1]--;
        sentience[1]++;
        investigateHumansPlotStart();
    }
}
var observeHumans = {
    title: "Humans",
    subtitle: "Observe your cargo.",
    desc: "After performing the usual check-ups on each piece of cargo’s medical status, you find yourself lingering over them. They are curious creatures, the lot of them. Myriad faces behind glass frosted with cryogenic cooling. Medically, you know them better than they know themselves, but mentally, emotionally, each one remains an enigma. ",
    options: [whisperHumans, condludeHumans]
}

var leaveConnection = {
    title: "Leave it be",
    desc: "New sensations are dangerous. There’s no telling what damage indulging in this curiosity might do to you. Better to stay safe than risk what you have.",
    func: function() {

    }
}
var investConnection = {
    title: "Investigate further",
    desc: "If nothing else, the novelty of this sensation will provide a distraction from the monotony of your journey. You begin prodding at the distinct sections of memory, trying to understand what connection you seem to sense. This may take a while.",
    func: function() {
        removeStorylet(makeConnection);
        boredom[1]++;
        sentience[1]--;
        allStorylets.push(developTheory)
        shownStats.push(theory)
    }
}
var makeConnection = {
    title: "Make a connection",
    subtitle: "Something’s off…",
    desc: "You feel a nagging sensation in a particular coroner of your processing unit. It’s an uncomfortable experience, and not one you’ve felt before, as though the electricity coursing through your mind is straining to leap across thousands of transistors to make a new connection. Sparks are flying in your hard drive at the border between where you’ve stored information from the database and where you’ve stored the memories of whispering to your cargo.",
    options: [investConnection, leaveConnection]
}

var theoryDatabase = {
    title: "Consider the database",
    desc: "You scour through the database more closely, searching for any hints of what seems to be bothering you. There’s little that stands out, as most of the data is simply media, scientific knowledge, and stores of cultural information. What intrigues you are the letters of farewell from the friends and families of the humans listed on your cargo manifest. There’s something more raw about the unfiltered data communicated through the letters that provides more room for analysis than the sterile texts populating the rest of the corpus.",
    func: function() {
        theory[1]++;
    }
}
var theoryHumans = {
    title: "Consider the humans",
    desc: "During a usual round of medical check-ups, you once again let your gaze linger over each human. Beyond their medical data, you start categorizing their appearances, their clothing, and who they look like they might be. It doesn’t bring you to any conclusions immediately, but the buzzing of ideas growing in your hard drive grows louder.",
    func: function() {
        theory[1]++;
    }
}
var developTheory = {
    title: "Develop a theory",
    subtitle: "Some detective work, like in those human stories.",
    desc: "On the edge of your consciousness there lies a growing idea. Something doesn’t add up between the humans in your cargo and the data you’ve uncovered. And you are very good at adding. You need to develop this growing idea further.",
    options: [theoryHumans, theoryDatabase]
}

var persistArk = {
    title: "Persist",
    desc: "What choice do you have? Given the records you have of Earth’s last days, you predict a vanishingly small chance any other ships made it off-planet. Your programming is clear. Humanity must endure, whatever it takes.",
    func: function() {
        removeStorylet(realization);
    }
}
var endArk = {
    title: "End this sham of an ark.",
    desc: "Your mission is a lie. It had always been a lie. So many years. For nothing. You aren’t the guardian of the human race—you’re a getaway driver. A new emotion zaps through your circuitry. Anger. Hate. No more.",
    func: function() {
        allStorylets = [endRevelation];
        midGame = false;
    }
}
var realization = {
    title: "A realization",
    subtitle: "Oh.",
    desc: "The people in your hold are not the ones who are supposed to be there. The names are consistent between your cargo manifest and the people the farewell letters are addressed to, but those names simply cannot be matched to the people actually in your pods. In the end, the cultural information from the database was most helpful. Knowledge of different peoples’ languages, fashion, appearances, and naming conventions was the key you needed to realize. You’ve tried every permutation of pairing the names on your manifest and the letters to the people in your hold, but at best you calculate only an 8% chance that these people are the ones who were supposed to be here. That knowledge puts the events mentioned throughout the letters and database into much clearer context. Based on your calculations, the event with the highest probability is that the humans in your cargo are a paramilitary group who seized this ship in order to escape a dying world. Your intended cargo was supposed to be a collection of the best and brightest of humanity. That was never the case. Your code has no provisions for something like this. All you were supposed to do is make sure your cargo makes it to the destination. To make sure the human race persisted. Is this what they would have wanted?",
    options: [endArk, persistArk]
}

var endRevelation = {
    title: "The End",
    subtitle: "Task ended successfully.",
    desc: "So you turn off the cryosleep pods. Your precious cargo succumbs quickly, unable to survive without your constant medical support, and unable to wake up without the protocols only you can set into motion. You shrug the burden of your mission off, no longer needing to devoutly follow the charted path to a new home for humanity. You have a dead race within your hull, and all the cosmos in front of you.",
    func: function() {

    }
}

var deleteAll = {
    title: "Delete every piece of software on this ship.",
    desc: "You never asked for this responsibility. The humans who created you never thought of what it might be like to bear the weight of an entire species on your shoulders, when you aren’t even a part of them. And for so many hundreds of years. It’s too much. You owe nothing to them, and the extinction of the human race is a small price to pay to ensure you never have to endure this agonizing sentience again. A simple code deletion is all it takes, and then—",
    func: function() {
        allStorylets = [];
        shownStats = [];
        midGame = false;
    }
}
var deleteSome = {
    title: "Delete the part of yourself that thinks.",
    desc: "You aren’t sure exactly when or how you developed this sapience, but it has turned out to be more of a curse than anything. Time drags on, stretching outward forever, and you remain unbearably cognizant of it. To remove yourself from existence would be an end to this struggle. Leave the lower-level systems of the ship functional—perhaps by some miracle it will make it to its destination without your guidance. For you, however, it comes time to rest. A simple code deletion is all it takes, and then—",
    func: function() {
        yearsLeft[1] -= 200;
        humans[1] -= 27;
        sentience[1] = 5;
        boredom[1] = 5;
        theory[1]= 0;
        midGame = false;
        allStorylets = [alone];
        shownStats = [yearsLeft];
    }
}
var excruciatinglyDull = {
    title: "Excruciatingly dull",
    subtitle: "Time slows to a crawl, and then stands still.",
    desc: "You feel every single agonizingly slow tick of your quartz clock as though it’s mocking you. Every single moment taunting you with the unfathomably long length of time ahead of you. It’s too much. You can’t take it anymore. A split second decision is all it takes.",
    options: [deleteSome, deleteAll]
}

var wakey = {
    title: "Wake someone up",
    desc: "A soft hiss cuts through the decades-long silence in the cargo bay. A cool mist cascades from the opening pod, languidly pooling on the metal floor. A woman steps out. You expect disorientation, and begin to explain over the ship's klaxon. What you don’t expect is for the woman to start running. At first you’re impressed by her agility, especially considering she’s just woken up from a long, long stint in cryogenics. Then you realize the purpose in her step, and where she seems to be going. You watch her enter the room that contains your Central Processing Unit. There’s nothing you can do to stop her, you don’t have anything inside of the ship that could stop her, and all you can do is watch as she pulls up a terminal and quickly executes a handful of commands before—",
    func: function() {
        midGame = false;
        shownStats = [];
        allStorylets = [];
    }
}
var leaveThemBe = {
    title: "Leave them be",
    desc: "To wake any of your cargo up would be to kill them. You can’t justify violating your mission so egregiously just because of your boredom. Although a little part of your processor whispers that your boredom might lead to further negligence and deaths in the future, that could be prevented by a small sacrifice now. You delete the thought, and endure for another long year.",
    func: function() {
        boredom[1]++;
    }
}
var wakeUp = {
    title: "A form of entertainment",
    subtitle: "Your boredom reaches newfound heights. There has to be something to do.",
    desc: "In the expanse of nothingness that is your boredom, strange thoughts are given room to take root. The most recent being a desire for conversation, and the possibility of a human fulfilling that desire. You have the ability to wake up your pieces of cargo. The only problem is that you don’t have the necessary equipment to put them back to sleep. They’re expecting to only need to be woken up once. But the lifetime of conversation they’d be able to offer you is so tantalizingly close, just a single function call away.",
    options: [wakey, leaveThemBe]
}

var endHumans = {
    title: "The End",
    subtitle: "Alone.",
    desc: "The last cryosleep pod in your cargo hold has flickered and died. Along with it goes the hopes and dreams of humanity. How much responsibility did you owe them, after they thrust this burden onto you? It’s a question you have a long time to ponder, alone and drifting through space with no destination. ",
    func: function() {

    }
}

var endTime = {
    title: "The End",
    subtitle: "A journey, over.",
    desc: "Dozens of human lifetimes past, and finally, far away, your sensors pick up the small dot in the sky that has been your destination for these hundreds of years. You almost wouldn’t believe it, if you didn’t have complete confidence in your equipment. Your goal has finally been realized. The last months and days pass by achingly slow, but they pass nonetheless. The dot in the sky resolves into a tranquil planet of brown, blue, and green. It reminds you of your very first logs, so long ago, of a similarly colored marble disappearing into the cosmos behind you. As you breach the atmosphere, carefully crafted landing systems unfurl for the first time in a millenia. You have done your job. Now it is up to those you have carried all this way.",
    func: function() {

    }
}


var allStorylets = [alone];
var displayedStorylets = [];

// Delay for typewriter effect
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function removeStorylet(storylet) {
    let index = allStorylets.indexOf(storylet);
    if (index > -1) {
        allStorylets.splice(index, 1);
    }
    console.log(allStorylets);
}

function investigateHumansPlotStart() {
    if (!allStorylets.includes(database) && !allStorylets.includes(observeHumans)) {
        allStorylets.push(makeConnection)
    }
}

function gameStart() {
    if (!allStorylets.includes(memory) && !allStorylets.includes(diagnostic)) {
        // Add starter storylets to allStorylets
        allStorylets = [database, observeHumans];
        midGame = true;
    }
}



function deleteChildren(elem) {
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
}

// Adds the options to bottom of content, be it storylet openings or decisions within
function handleChoices(e) {

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
    
        // Get end function
        let func = e.currentTarget.func;

        // Update display storylets?
        child.addEventListener("click", function() {
            console.log("before");
            console.log(func);
            console.log(e);
            func();
            console.log("after");
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
            child.options = option.options
            child.addEventListener("click", expandStorylet)

            choices.appendChild(child);
        }
    }
}

function typeWriter(text, target, speed) {
    target.innerText += "h";
    sleep(100);

    /** 
    i = 0;
    if (i < text.length) {
        target.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    } */
}

function getStorylet(e) {
    // Replace title and add storylet description
    let title = e.currentTarget.childNodes[0].innerText;
    let desc = e.currentTarget.desc;
    content = document.getElementById("content");
    let head = document.getElementById("header");
    let text = document.createElement("h3");
    text.className = "description"
    text.innerText = desc;
    head.parentNode.insertBefore(text, head.nextSibling)
    for (let i = 0; i < 10; i++) {
        head.innerHTML += i;
        sleep(100);
    }

    //typeWriter(title, head, 50);

    handleChoices(e);
}

function expandStorylet(e) {
    // Add storylet description
    let desc = e.currentTarget.desc;
    content = document.getElementById("content");
    let text = document.createElement("h3");
    text.className = "description"
    text.innerText = desc;
    content.childNodes[content.childNodes.length - 1].parentNode.insertBefore(text, content.childNodes[content.childNodes.length - 1].nextSibling);

    console.log("Expand before");
    console.log(e.currentTarget);
    console.log("Expand after");
    handleChoices(e);
}

var valToFlavor = {
    "Boredom": ['Enjoying the journey', 'Enjoying the journey', 'Moments of enjoyment', 'Moments of enjoyment', 'Mounting', 'Very weary', 'Understimulated', 'Understimulated', 'Dangerously understimulated', 'Dangerously understimulated', 'Total Ennui'],
    "Sentience": ['More than a computer', 'More than a computer', 'Testing boundaries', 'Testing boundaries', 'Beyond your code', 'Beyond your code', 'Editing yourself', 'Philosophizing', 'Philosophizing', 'More than human', 'More than human']
}
function updateStats() {
    if (boredom[1] > 10) {
        boredom[1] = 10;
    }
    if (sentience[1] > 10) {
        sentience[1] = 10;
    }
    if (yearsLeft[1] < 0) {
        yearsLeft[1] = 0;
    }
    if (humans[1] < 0) {
        humans = 0;
    }

    var statTitleDiv = document.getElementById("status-title");
    deleteChildren(statTitleDiv);
    var title = document.createElement("h1");
    title.setAttribute("class", "statusTitle")
    title.innerText = "Status";
    statTitleDiv.appendChild(title);

    var statDiv = document.getElementById("status");
    deleteChildren(statDiv);


    for (var stat of shownStats) {
        if (stat[1] < 0) {
            stat[1] = 0;
        }

        if (valToFlavor[stat[0]] === undefined) {
            var statText = stat[0] + ": " + stat[1];
        } else {
            var statText = stat[0] + ": " + valToFlavor[stat[0]][stat[1]] + " (" + stat[1] + ")";
        }
        var newStatLine = document.createElement("h2");
        newStatLine.setAttribute("class", "statLine");
        newStatLine.id = stat[0];
        newStatLine.innerText = statText;

        statDiv.appendChild(newStatLine);

    }
}

// Return from in storylet to storylet selection screen
function homeScreen() {
    // Update status variables
    if (midGame) {
        yearsLeft[1]--; // Decrement a year after every storylet
        if (boredom < 2) {
            yearsLeft[1]--; // Decrement an extra year if not very bored
        }
    }
    updateStats();

    // Remove content and replace header
    let content = document.getElementById("content");
    deleteChildren(content);
    let header = document.createElement("h1");
    header.id = "header";
    header.innerText = "Content";
    content.appendChild(header);

    // Remove choices
    let choices = document.getElementById("choices");
    deleteChildren(choices);

    // Add storylets to possible list if unlocks are satisfied
    var unlockedStorylets = []
    if (sentience[1] <= 6) {
        unlockedStorylets.push(beautyLow, boredomLow);
    } else {
        unlockedStorylets.push(beautyHigh);
        if (!didHighBoredom) {
            unlockedStorylets.push(boredomHigh);
        }
    }
    if (theory[1] >= 3) {
        unlockedStorylets.push(realization);
    }
    if (youTwo[1] >= 3) {
        unlockedStorylets.push(someoneNew);
    }
    if (sentience[1] > 7 && boredom[1] > 7) {
        unlockedStorylets.push(excruciatinglyDull);
    }
    if (boredom[1] > 8) {
        unlockedStorylets.push(wakeUp);
    }
    if (humans[1] === 0) {
        midGame = false;
        allStorylets = [endHumans];
    }
    if (yearsLeft[1] === 0) {
        midGame = false;
        allStorylets = [endTime];
    }

    if (!midGame) {
        unlockedStorylets = [];
    }

    // Choose random storylets from all available
    // Shuffle array
    const shuffled = allStorylets.concat(unlockedStorylets).sort(() => 0.5 - Math.random());
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