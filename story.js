/* =========================================================
   NOVA — HER STORY
   ========================================================= */

const story = document.getElementById("story");
const title = document.getElementById("title");
const storyText = document.getElementById("storyText");
const nextButton = document.getElementById("nextButton");

const sceneImage = document.getElementById("sceneImage");
const visualFallback = document.getElementById("visualFallback");
const floatingParticles = document.getElementById("floatingParticles");

const progressFill = document.getElementById("progressFill");
const progressLabel = document.getElementById("progressLabel");

const storyCard = document.getElementById("storyCard");
const flash = document.getElementById("flash");


// =========================================================
// CURRENT SCENE
// =========================================================

let currentScene = 0;
let isChanging = false;


// =========================================================
// STORY SCENES
// =========================================================

const scenes = [

    // =====================================================
    // 01 — COLLEGE
    // =====================================================

    {
        title: "The Girl Who Felt Too Much",

        image: "images/college.jpg",

        theme: "scene-ordinary",

        text: `Before the stars ever knew her name, she was simply a girl trying to find her place in a noisy world.

She was an ordinary college student.

Classes. Assignments. Deadlines.

Friends laughed in corridors while voices crossed over one another.

Everyone seemed to have somewhere to be.

Everyone seemed to know what they were doing.

But somehow, she always felt as though she was standing just outside of it all.

The world was loud.

And the louder it became, the quieter she felt.

She noticed things other people missed.

A tired face.

A trembling voice.

Someone sitting alone.

A smile that was not really a smile.

She felt everything.

Perhaps that was why the world sometimes felt too heavy.

And even when she returned home — the place that was supposed to be her comfort — the silence did not always make her feel less alone.

We, the Lumari, had watched countless worlds rise and disappear.

But we remembered her.

Because sometimes, the smallest light is the one the universe notices first.`
    },


    // =====================================================
    // 02 — HOME
    // =====================================================

    {
        title: "The Room That Knew Her",

        image: "images/home.jpg",

        theme: "scene-home",

        text: `That evening, she came home later than usual.

She placed her bag on the floor and sat beside her bed.

For a while, she did nothing.

The room was quiet.

Her thoughts were not.

She opened the drawer beside her bed and pulled out the diary she never showed anyone.

Its pages carried the words she could never say aloud.

She wrote about college.

About feeling lost.

About wanting to help people but never knowing how.

Then, after a long pause, she wrote one sentence.

"I wish I could do something."

She stared at the words.

The Lumari remember moments like this.

Not the moments when heroes are celebrated.

The moments before they know they are heroes.

She closed the diary.

She turned off the light.

And eventually, the girl who had spent the whole day feeling everything...

fell asleep.`
    },


    // =====================================================
    // 03 — SLEEP
    // =====================================================

    {
        title: "The Night Everything Changed",

        image: "images/sleeping.jpg",

        theme: "scene-dream",

        text: `While her body rested beneath the blanket, her mind wandered somewhere far beyond her room.

The ceiling disappeared.

The walls disappeared.

The ordinary world disappeared.

She was still asleep.

But her dream had opened its eyes.

A strange blue light appeared beyond the darkness.

It moved slowly through the dream...

as though it had been searching for her.

Then the darkness became a city.

Lights flickered below.

Sirens echoed through the streets.

People were afraid.

And somewhere in that enormous city...

someone needed help.

She looked around.

There was no one else.

Then she heard a voice.

Not from the city.

Not from the sky.

From within her.

"You have always wanted to make a difference."

She looked down at her hands.

Light began to gather around them.`
    },


    // =====================================================
    // 04 — HERO DREAM
    // =====================================================

    {
        title: "The Hero in Her Dream",

        image: "images/hero-dream.jpg",

        theme: "scene-hero-dream",

        text: `And then she saw herself.

Not the uncertain college girl.

Not the girl who wondered whether anyone was listening.

Something else.

Something brighter.

She was standing above the city.

Energy moved around her like living stars.

She could hear people calling for help from streets away.

She moved.

Faster than thought.

A child was trapped beneath fallen debris.

She lifted it.

A building began to collapse.

She reached it before the first floor could fall.

Someone was lost in the darkness.

She found them.

Every time someone needed help, something inside her answered.

For the first time, the sensitivity she had always considered a burden felt different.

It was direction.

It was awareness.

It was power.

Then a brilliant sphere of light appeared in front of her.

It drifted closer.

The entire dream became silent.

The light reached toward her hand.

She touched it.

And the stars themselves seemed to wake up.`
    },


    // =====================================================
    // 05 — MORNING
    // =====================================================

    {
        title: "Morning",

        image: "images/morning.jpg",

        theme: "scene-morning",

        text: `She woke before her alarm.

Sunlight rested across the room.

For a few seconds, she simply stared at the ceiling.

The dream was still inside her mind.

The city.

The light.

The feeling of becoming someone capable of helping.

Then she noticed something strange.

She felt different.

Not heavier.

Lighter.

She got out of bed quickly.

She moved through the room with a speed she had never felt before.

Getting ready took half the usual time.

She reached for her bag before she even realized she had moved.

In the mirror, she stopped.

She looked like herself.

But her eyes seemed brighter.

A small smile appeared.

"Maybe today will be different."

She had no idea how true those words were.`
    },


    // =====================================================
    // 06 — COLLEGE POWER
    // =====================================================

    {
        title: "The First Sign",

        image: "images/college-power.jpg",

        theme: "scene-college",

        text: `College looked exactly the same.

The same corridors.

The same classrooms.

The same conversations.

But she was different.

As she walked through the corridor, a book slipped from another student's hands.

It fell.

She moved.

Not consciously.

Not deliberately.

She simply appeared there.

Her hand caught the book before it touched the floor.

Silence.

Everyone stared.

She stared too.

She hadn't even seen herself move.

For one impossible second, the world seemed slower around her.

A whisper passed through the corridor.

"How did you do that?"

She had no answer.

She looked down at her hands.

The Lumari watched from beyond the visible world.

The first spark had appeared.

She just didn't know it yet.`
    },


    // =====================================================
    // 07 — POWER AWAKENING
    // =====================================================

    {
        title: "The First Spark",

        image: "images/awakening.jpg",

        theme: "scene-awakening",

        text: `That evening, she returned to her room with a question she could not ignore.

The dream.

The speed.

The strange feeling in her hands.

She placed a small object on the table.

She stared at it.

Nothing.

She concentrated harder.

Still nothing.

She closed her eyes.

Breathed slowly.

And remembered the light from the dream.

A tiny spark appeared between her fingers.

She opened her eyes.

The spark disappeared.

She tried again.

This time, blue energy travelled across her palm.

Her heart raced.

She laughed.

Then she became afraid.

The light flickered.

She calmed herself.

The energy became steady.

That was when she understood.

The dream had not been only a dream.

Something had crossed over with her.

Something had awakened inside her.`
    },


    // =====================================================
    // 08 — TRAINING
    // =====================================================

    {
        title: "Learning What She Had Become",

        image: "images/training.jpg",

        theme: "scene-training",

        text: `Power did not come with instructions.

There was no manual.

No teacher.

No map.

So she became her own teacher.

Every evening, she trained.

She learned that she could move faster than before.

She learned to create small shields of energy.

She learned to gather light in her hands.

She learned to release it without losing control.

But the greatest lesson was not about power.

It was about emotion.

When she was afraid, the energy became unstable.

When she was angry, it became stronger — but dangerous.

When she was calm...

the power listened.

Slowly, she began to understand.

Her ability was connected to everything she had spent years trying to hide.

Her sensitivity.

Her empathy.

Her ability to notice what others ignored.

The thing she once thought made her weak...

was becoming the thing that made her powerful.`
    },


    // =====================================================
    // 09 — HELPING
    // =====================================================

    {
        title: "The First Time She Helped",

        image: "images/helping.jpg",

        theme: "scene-helping",

        text: `Weeks passed.

She still went to college.

She still attended lectures.

She still worried about assignments.

To everyone else, she was still the same girl.

But now she carried a secret.

One evening, she noticed someone who needed help.

She could have walked past.

Nobody would have known.

But she remembered the girl she used to be.

The girl who wished someone would notice.

So she stopped.

She listened.

Then she acted.

Her power moved quietly.

No cameras.

No applause.

No one knew what had happened.

The problem was solved.

The person was safe.

And she walked away.

For the first time, she understood something important.

Being a hero was not about being seen.

It was about seeing others.`
    },


    // =====================================================
    // 10 — GUARDIAN
    // =====================================================

    {
        title: "The Name She Chose",

        image: "images/nova2.png",

        theme: "scene-guardian",

        text: `Her training continued.

Day after day, night after night.

She became faster.

Stronger.

More precise.

But strength alone did not define her.

She learned to protect.

She learned to listen.

She learned when to act.

And she learned when simply staying beside someone was enough.

One night, she stood on the roof of a building and looked at the city below.

The lights stretched toward the horizon.

She remembered the girl sitting alone on her bed.

The girl writing in a diary.

The girl wishing she could do something.

Now she could.

She needed a name.

A name that meant more than power.

A name that meant a new beginning.

She looked toward the sky.

A single burst of light crossed the darkness.

And she smiled.

"NOVA."

The name stayed with her.

Like a star being born.`
    },


    // =====================================================
    // 11 — DOUBLE LIFE
    // =====================================================

    {
        title: "Two Lives",

        image: "images/nova2.png",

        theme: "scene-today",

        text: `From then on, she lived between two worlds.

By day, she was a college student.

Lectures.

Assignments.

Friends.

Ordinary conversations.

Ordinary problems.

But when the city needed her...

she became NOVA.

She did not save the world every night.

Sometimes her greatest act was helping one person.

Sometimes it was stopping before someone walked into danger.

Sometimes it was simply listening.

The Lumari had seen warriors with enormous power.

We had seen rulers command planets.

But we remembered NOVA for something smaller.

She never forgot what it felt like to be unheard.

And because she remembered...

she became someone who listened.`
    },


    // =====================================================
    // 12 — PRESENT / BEGINNING
    // =====================================================

    {
        title: "The Girl She Became",

        image: "images/nova2.png",

        theme: "scene-final",

        text: `Today, she is still learning.

Still training.

Still discovering what the strange energy inside her can become.

She has not become perfect.

She still has difficult days.

She still has questions.

She still sometimes feels the world becoming too loud.

But now she knows something she did not know before.

She is not powerless.

The girl who once felt invisible became someone others could find.

The girl who wished she could help became someone who could.

The girl who felt everything discovered that feeling deeply was never her weakness.

It was the beginning of her strength.

And so her story does not end here.

Because somewhere beyond these stars...

another signal has appeared.

Someone is waiting.

Someone needs to be heard.

And NOVA is listening.

The Lumari will remember this moment.

Because this is not the end of her story.

It is the moment her real story begins.`
    }

];


// =========================================================
// IMAGE LOADING
// =========================================================

function setSceneImage(path) {

    sceneImage.classList.remove("visible");

    if (!path) {
        sceneImage.removeAttribute("src");
        visualFallback.style.display = "grid";
        return;
    }

    visualFallback.style.display = "grid";

    sceneImage.onload = function () {

        visualFallback.style.display = "none";

        requestAnimationFrame(() => {
            sceneImage.classList.add("visible");
        });
    };

    sceneImage.onerror = function () {

        sceneImage.classList.remove("visible");

        visualFallback.style.display = "grid";

        console.warn(
            "NOVA image not found:",
            path
        );
    };

    sceneImage.src = path;
}


// =========================================================
// PARTICLES
// =========================================================

function createParticles(amount = 12) {

    if (!floatingParticles) return;

    for (let i = 0; i < amount; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            "power-particle";

        particle.style.left =
            `${45 + Math.random() * 50}%`;

        particle.style.top =
            `${35 + Math.random() * 45}%`;

        particle.style.animationDelay =
            `${Math.random() * 0.45}s`;

        floatingParticles.appendChild(
            particle
        );

        setTimeout(() => {

            particle.remove();

        }, 3000);
    }
}


// =========================================================
// VISUAL CHANGES
// =========================================================

function updateVisuals(scene) {

    story.className = scene.theme;

    const powerScenes = [
        "scene-dream",
        "scene-hero-dream",
        "scene-awakening",
        "scene-training",
        "scene-guardian",
        "scene-today",
        "scene-final"
    ];

    if (powerScenes.includes(scene.theme)) {

        createParticles(
            scene.theme === "scene-final"
                ? 30
                : 15
        );
    }
}


// =========================================================
// PROGRESS BAR
// =========================================================

function updateProgress(index) {

    const total = scenes.length;

    const percentage =
        ((index + 1) / total) * 100;

    progressFill.style.width =
        `${percentage}%`;

    progressLabel.textContent =
        `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
}


// =========================================================
// LOAD SCENE
// =========================================================

function loadScene(index) {

    if (!scenes[index]) return;

    const scene = scenes[index];

    currentScene = index;

    // ---------------------------------------------
    // TEXT
    // ---------------------------------------------

    title.textContent =
        scene.title;

    storyText.textContent =
        scene.text;

    // Always start new scene from top.
    storyText.scrollTop = 0;


    // ---------------------------------------------
    // IMAGE
    // ---------------------------------------------

    setSceneImage(
        scene.image
    );


    // ---------------------------------------------
    // BACKGROUND
    // ---------------------------------------------

    updateVisuals(scene);
         if (index < 9) {
    story.classList.add("stretch-image");
} else {
    story.classList.remove("stretch-image");
}

sceneImage.style.transform = "";

    // ---------------------------------------------
    // PROGRESS
    // ---------------------------------------------

    updateProgress(index);


    // ---------------------------------------------
    // BUTTON
    // ---------------------------------------------

    if (index === scenes.length - 1) {
    nextButton.innerHTML =
        `<span>VIEW REQUEST STATUS</span><b>→</b>`;
} else {
    nextButton.innerHTML =
        `<span>CONTINUE</span><b>→</b>`;
}


    // ---------------------------------------------
    // ANIMATION
    // ---------------------------------------------

    storyCard.style.animation = "none";

    void storyCard.offsetWidth;

    storyCard.style.animation =
        "storyEnter .8s ease both";
}


// =========================================================
// NEXT SCENE
// =========================================================

function nextScene() {

    if (isChanging) return;


    // ---------------------------------------------
    // LAST SCENE
    // ---------------------------------------------

    if (currentScene >= scenes.length - 1) {

    if (flash) {
        flash.classList.remove("active");
        void flash.offsetWidth;
        flash.classList.add("active");
    }

    setTimeout(() => {

        window.location.href = "request-status.html";

    }, 650);

    return;
}


    // ---------------------------------------------
    // SCENE TRANSITION
    // ---------------------------------------------

    isChanging = true;

    storyCard.classList.remove(
        "changing"
    );

    void storyCard.offsetWidth;

    storyCard.classList.add(
        "changing"
    );


    createParticles(8);


    setTimeout(() => {

        loadScene(
            currentScene + 1
        );

        isChanging = false;

    }, 300);
}


// =========================================================
// CONTINUE BUTTON
// =========================================================

nextButton.addEventListener(
    "click",
    nextScene
);


// =========================================================
// KEYBOARD CONTROLS
// =========================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter" ||
            event.key === "ArrowRight" ||
            event.key === " "
        ) {

            event.preventDefault();

            nextScene();
        }
    }
);


// =========================================================
// IMAGE MOUSE INTERACTION
// =========================================================

const visualFrame =
    document.querySelector(
        ".visual-frame"
    );


if (visualFrame) {

    visualFrame.addEventListener(
        "pointermove",
        function (event) {

            const rect =
                visualFrame.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;

            sceneImage.style.transform =
                `translate(${x * 8}px, ${y * 8}px) scale(1.015)`;
        }
    );


    visualFrame.addEventListener(
        "pointerleave",
        function () {

            sceneImage.style.transform =
                "";
        }
    );
}


// =========================================================
// START STORY
// =========================================================

loadScene(0);